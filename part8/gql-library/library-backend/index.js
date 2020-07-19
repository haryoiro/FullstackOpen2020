const { ApolloServer, gql, UserInputError } = require('apollo-server')
const { v1: uuid } = require('uuid')


let authors = [
  {
    name: 'Robert Martin',
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  { 
    name: 'Joshua Kerievsky', // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  { 
    name: 'Sandi Metz', // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]

/*
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
*/

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'patterns']
  },  
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'crime']
  },
  {
    title: 'The Demon ',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'revolution']
  },
]

const typeDefs = gql`
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Books!]!
    allAuthors: [Authors!]!
  }
  type Books {
    title: String!
    published: Int!
    author: String!
    id: ID!
    genres: [String!]!
  }
  type Authors {
    name: String!
    bookCount: Int
    born: Int
    id: ID!
  }
  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): [Books!]!
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Authors
  }
`

const resolvers = {
  Query: {
    bookCount: () => books.length,
    authorCount: () => authors.length,
    allBooks: (_, args) => {
      if (args.author && args.genre)
        return books.filter(b => (b.author === args.author) && (b.genres.includes(args.genre)))
      else if (args.genre)
        return books.filter(b => b.genres.includes(args.genre))
      else if (args.author)
        return books.filter(b => b.author === args.author)
      else
        return books
    },
    allAuthors: () => {
      return authors
    }
  },
  Mutation: {
    addBook: (root, args) => {
      if (books.find(b => b.title === args.title)) {
        throw new UserInputError('Title must be unique', {
          invalidArgs: args.title,
        })
      }
      if (books.find(b => b.authors !== args.author)) {
        const author = { name: args.author, id: uuid() }
        authors = authors.concat(author)
      }
      const book = { ...args, published: Number(args.published), id: uuid() }
      console.log(book)
      return [...books, book]
    },
    editAuthor: (root, args) => {
      if (!(args.name || args.setBornTo)) return null

      const byAuthor = authors.find(a => a.name === args.name)
      if (!byAuthor) return null

      const editedAuthor = { ...byAuthor, born: args.setBornTo}
      authors = authors.map(a => a.name === args.name ? editedAuthor : a)

      return editedAuthor
    }
  },
  Authors: {
    name: (root) => root.name,
    born: (root) => root.born,
    bookCount: (root) => books.filter((a) => a.author == root.name).length
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})