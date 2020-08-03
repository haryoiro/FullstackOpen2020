require('dotenv').config()
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const { ApolloServer, PubSub, UserInputError, AuthenticationError } = require('apollo-server')
const { MONGODB_URI, JWT_SECRET } = require('./util/config')

const { typeDefs } = require('./typeDefs/typeDefs')
const Person = require('./models/person.model')
const User = require('./models/user.model')
const pubsub = new PubSub()




mongoose.set('useFindAndModify', false)
console.log('--------------------------------')
console.log('CONNECTING TO ', MONGODB_URI)
console.log('--------------------------------')

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useCreateIndex: true  })
  .then(() => console.log('CONNECTED TO MONGODB') )
  .catch((error) => console.log('ERROR CONNECTION TO MONGODB: ', error.message) )



const resolvers = {
  Query: {
    personCount: () => Person.collection.countDocuments(),
    allPersons: (root, args) => {
      if (!args.phone) return Person.find({}).populate('friendOf')
      return Person
        .find({
          phone: {
            $exists: args.phone === 'YES '
          }
        })
        .populate('friendOf')
    },
    findPerson: (root, args) =>
      Person.findOne({ name: args.name }),
    me: (root, args, context) =>
      context.currentUser
  },

  Person: {
    address: (root) => {
      return {
        street: root.street,
        city: root.city,
      }
    },
    friendOf: async (root) => {
      const friends = await User.find({
        friends: { $in: [root._id] }
      })
  
      return friends
    }
  },

  Mutation: {
    addPerson: async (_, args, context) => {
      const person = new Person({ ...args })
      const currentUser = context.currentUser

      if (!currentUser) { throw new AuthenticationError('NOT AUTHENTICATED') }

      try {

        await person.save()
        currentUser.friends = [...currentUser.friends, person]
        await currentUser.save()

      } catch (error) {
      
        throw new UserInputError(error.message, { invalidArgs: args })
      
      }

      pubsub.publish('PERSON_ADDED', { personAdded: person })

      return person
    },

    createUser: (_, args) => {
      const user = new User({ username: args.username })

      return user.save()
        .catch((error) => {
          throw new UserInputError(error.message,
            { invalidArgs: args })
        })
    },

    login: async (_, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secret') {
        throw new UserInputError('WRONG CREDENTIALS')
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return {
        value: jwt.sign(userForToken, JWT_SECRET)
      }
    },

    editNumber: async (_, args) => {
      const person = await Person.findOne({ name: args.name })
      person.phone = args.phone

      try {

        person.save()
     
      } catch (error) {
     
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
     
      }

      return person
    },

    addAsFriend: async (root, args, { currentUser }) => {
      const nonFriendAlready = (person) =>
        !currentUser.friends.map((f) => f._id).includes(person._id)

      if (!currentUser) {
        throw new AuthenticationError('NOT AUTHENTICATED')
      }

      const person = await Person.findOne({ name: args.name })
      if (nonFriendAlready(person)) {
        currentUser.friends = [...currentUser.friends, person]
      }

      await currentUser.save()
      return currentUser
    },
  },

  Subscription: {
    personAdded: {
      subscribe: () => pubsub.asyncIterator(['PERSON_ADDED'])
    }
  }
}




/* APOLLO SETTINGS */
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req && req.headers.authorization ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify( auth.substring(7), JWT_SECRET )
      const currentUser = await User.findById(decodedToken.id).populate('friends')

      return { currentUser }
    }
  }
})




/* START TO SERVER */
server
  .listen()
  .then(({ url, subscriptionsUrl }) => {
    console.log(`Server ready at ${url}`)
    console.log(`Subscriptions ready at ${subscriptionsUrl}`)
  })