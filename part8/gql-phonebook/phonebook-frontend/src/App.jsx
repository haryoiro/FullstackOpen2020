import React, { useState } from 'react'
import { useQuery, useApolloClient } from '@apollo/client'

import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import PhoneForm from './components/PhoneForm'
import LoginForm from './components/LoginForm'

import { ALL_PERSONS } from './queries'

function App() {
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const result = useQuery(ALL_PERSONS, { pollInterval: 2000 })
  const client = useApolloClient()

  if (result.loading) { return <div>loading...</div>  }

  if (!token) {
    return (
      <div>
        <Notify errorMessage={errorMessage} />
        <h2>Login</h2>
        <LoginForm
          setToken={setToken}
          setError={notify}
        />
      </div>
    )
  }

  function notify(message) {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  function logout() {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <>
      <button onClick={logout}>LOGOUT</button>
      <Notify errorMessage={errorMessage} />
      <Persons persons={result.data.allPersons} />
      <PersonForm setError={notify} />
      <PhoneForm setError={notify} />
    </>
  )
}


function Notify({ errorMessage }) {
  if (!errorMessage) return null

  return (
    <div style={{ color: 'red' }}>
      {errorMessage}
    </div>
  )
}

export default App