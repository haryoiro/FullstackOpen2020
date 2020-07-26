import PromisePolyfill from 'promise-polyfill'
import React from 'react'
import { render } from 'react-dom'
import App from './App'
import { setContext } from 'apollo-link-context'
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from '@apollo/client'

if (!window.Promise) window.Promise = PromisePolyfill

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('phone-number-user-token')
  return {
    headers: {
      ...headers,
      authorization: token ? `bearer ${token}` : null,
    }
  }
})

const httpLink = new HttpLink({ uri: 'http://localhost:4000'})

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink)
})

render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
  ,
  document.getElementById('root')
)