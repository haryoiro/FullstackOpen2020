import PromisePolyfill from 'promise-polyfill'
import React from 'react'
import { render } from 'react-dom'
import App from './App'


import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  gql,
} from '@apollo/client'

if (!window.Promise) window.Promise = PromisePolyfill

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'http://localhost:4000',
  })
})

const query = gql`
query {
  allPersons {
    name,
    phone,
    address {
      street,
      city,
    }
    id
  }
}
`

client.query({ query })
  .then((response) => {
    console.log(response.data)
  })

render(
  <App />,
  document.getElementById('root')
)