const { gql } = require('apollo-server')

const types = `
  type Person {
    name: String!
    phone: String
    address: Address!
    friendOf: [User!]!
    id: ID!
  }
  type Address {
    street: String!
    city: String!
  }
  type User {
    username: String!
    friends: [Person!]!
    id: ID!
  }
  type Token {
    value: String!
  }
`

const queries = `
 type Query {
    personCount: Int!
    allPersons(phone: YesNo): [Person!]!
    findPerson(name: String!): Person
    me: User
  }
`

const mutation = `
 type Mutation {
    addPerson(
      name: String!
      phone: String
      street: String!
      city: String!
    ): Person

    createUser(
      username: String!
    ): User

    login(
      username: String!
      password: String!
    ): Token

    editNumber(
      name: String!
      phone: String!
    ): Person

    addAsFriend(
      name: String!
    ): User
  }
`

const subscriptions = `
  type Subscription {
    personAdded: Person!
  }
`

const enumTypes = `
  enum YesNo {
    YES
    NO
  }
`

const typeDefs = gql`
  ${enumTypes}
  ${types}
  ${queries}
  ${mutation}
  ${subscriptions}
`

module.exports = {
  typeDefs
}