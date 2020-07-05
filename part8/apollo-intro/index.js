const { ApolloServer, UserInputError, gql } = require('apollo-server')
const { v1: uuid } = require('uuid')

let persons = [
  {
    name: "Arto Hellas",
    phone: "040-123543",
    street: "Tapiolankatu 5 A",
    city: "Espoo",
    id: "3d594650-3436-11e9-bc57-8b80ba54c431"
  },
  {
    name: "Matti Luukkainen",
    phone: "040-432342",
    street: "Malminkaari 10 A",
    city: "Helsinki",
    id: '3d599470-3436-11e9-bc57-8b80ba54c431'
  },
  {
    name: "Venla Ruuska",
    street: "Nallemäentie 22 C",
    city: "Helsinki",
    id: '3d599471-3436-11e9-bc57-8b80ba54c431'
  },
]

/* Schema */
/**
 * データの構造を示す
 * ID型はfield値の一意性を担保する
 * エクスクラメーションマーク（！）はフィールドに対しnon-nullであることを強制する。
 * (必須フィールド)
 */
const typeDefs = gql`
  enum YesNo {
    YES
    NO
  }

  type Address {
    street: String!
    city: String!
  }

  type Person {
    name: String!
    phone: String
    address: Address!
    id: ID!
  }

  type Query {
    personCount: Int!
    allPersons(phone: YesNo): [Person!]!
    findPerson(name: String!): Person
  }

  type Mutation {
    addPerson(
      name: String!
      phone: String
      street: String!
      city: String!
    ): Person
    editNumber(
      name: String!
      phone: String!
    ): Person
  }
`

/* Resolvers */
/**
 * Resolverは何も指定しない場合、Default Resolverが割り当てられる。
 * (root) => root[parameter]
 * 
 * ex:
 *  (root) => root.name
 * Resolverは第一引数である`root`を介してデータにアクセスできる
 * 
 */
const resolvers = {
  Query: {
    personCount: () => persons.length,
    allPersons: (root, args) => {
      if (!args.phone) {return persons}
    },
    findPerson: (root, args) => persons.find(p => p.name === args.name)
  },
  Person: {
    address: ({ street, city }) => {
      return {
        street,
        city
      }
    }
  },
  Mutation: {
    addPerson: (root, args) => {
      if (persons.find(p => p.name === args.name)) {
        throw new UserInputError('Name must be unique', {
          invalidArgs: args.name,
        })
      }

      const person = { ...args, id: uuid() }
      persons = [ ...persons, person ]
      return person
    },
    editNumber: (root, args) => {
      const person = persons.find(p => p.name === args.name)
      if (!person) return null

      const updatedPerson = { ...person, phone: args.phone }
      persons = persons.map(p => p.name === args.name ? updatedPerson : p)
      return updatedPerson
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: {
    version: '1.7.25'
  },
})

server
  .listen()
  .then(({ url }) => {
    console.log(`🚀 SERVER READY AT ${url}`)
  })
