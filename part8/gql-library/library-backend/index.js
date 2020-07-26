require('dotenv').config()
const { ApolloServer, gql, UserInputError, AuthenticationError } = require('apollo-server')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const {
  MONGODB_URI,
  JWT_SECRET,
} = require('./util/config')
const Book =  require('./model/book.model')
const Author = require('./model/author.model')
const User =  require('./model/user.modle')

mongoose.set('useFindAndModify', false)
console.log('--------------------------------')
console.log('CONNECTING TO ', MONGODB_URI)
console.log('--------------------------------')

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true  })
  .then(() => {
    console.log('CONNECTED TO MONGODB')
  })
  .catch((error) => {
    console.log('ERROR CONNECTION TO MONGODB: ', error.message)
  })

const typeDefs = gql`
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Book {
    title: String!
    published: Int!
    author: Author
    genres: [String!]!
    id: ID!
  }
  type Author {
    name: String,
    born: Int,
    bookCount: Int,
    id: ID!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(
      author: String,
      genre: String
    ): [Book]
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    createUser(
      username: String!
      favoriteGenre: String!
    ): User

    login(
      username: String!
      password: String!
    ): Token

    addBook(
      title: String!
      published: Int!
      name: String!
      genres: [String!]!
    ): Book!

    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.find({}).countDocuments(),
    authorCount: () => Author.find({}).countDocuments(),
    allBooks: (_, { author, genre }) => {
      if (genre) {
        return Book.find({ genre }).populate('author')
      }
      return Book.find({}).populate('author')
    },
    allAuthors: () => {
      return Author.find({})
    },
    me: (_,args,context) => {
      return context.currentUser
    }
  },
  Mutation: {
    createUser: async (root, args) => {
      const { username, favoriteGenre } = args
      const newUser = new User({ username , favoriteGenre })

      try {
        await newUser.save()
      } catch (error) {
        throw new UserInputError(error.message, { invalidValue: args })
      }
  
      return newUser
    },
    login: async (root, args) => {
      const { username, password } = args

      const user = await User.findOne({ username })
      if (!user || password !== 'secret') {
        throw new UserInputError('WRONG CREDENTIALS')
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, JWT_SECRET)}
    },
    addBook: async (root, { name, title, published, genres }, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError('NOT AUTHENTICATED')
      }
      try {
        const newBook = await new Book({ title, published, genres })

        let authorId = await Author.findOne({ name }).select('_id')
        if (!authorId) {
          const newAuthor = await new Author({ name })
          await newAuthor.save()
          authorId = newAuthor._id
        }

        newBook.author = authorId
        await newBook.save()
        const returnedBook = await Book.findOne({ title }).populate('author')
        return returnedBook
      } catch (error) {
        throw new UserInputError(error.message)
      }

    },
    editAuthor: async (root, args, { currentUser }) => {
      const { name, setBornTo } = args
      if (!currentUser) {
        throw new AuthenticationError('NOT AUTHENTICATED')
      }
      const author = await Author.findOne({ name })
      try {
        author.born = Number(setBornTo)

        await author.save()
      } catch (error) {
        throw new UserInputError("invalid value", { invalidArgs: args })
      }

      return author
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
      if (auth && auth.toLowerCase().startsWith('bearer ')) {
        const decodedToken = jwt.verify(
          auth.substring(7),
          JWT_SECRET,
        )

        const currentUser = await User.findById(decodedToken.id)
        return { currentUser }
      }
  }
})
server
  .listen()
  .then(({ url }) => {
  console.log(`Server ready at ${url}`)
})