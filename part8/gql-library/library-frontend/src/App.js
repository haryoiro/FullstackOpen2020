import React, { useState, useEffect } from 'react'
import { useApolloClient } from '@apollo/client'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'

const Notify = ({ errorMessage }) => {
  if (!errorMessage) return null
  return (
    <div style={{ color: 'red' }}>
      {errorMessage}
    </div>
  )
}

const App = () => {
  const [errorMessage, setErrorMessage] = useState('')
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  useEffect(() => {
    let currentToken = localStorage.getItem('library-number-user-token')
    if (currentToken) {
      setToken(currentToken)
    }
  }, [])

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const logout = () => {
    setToken(null)
    window.localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>AUTHORS</button>
        <button onClick={() => setPage('books')}>BOOK LIST</button>
        {token
          ? <>
            <button onClick={() => setPage('add')}>ADD BOOK</button>
            <button onClick={() => logout()}>LOGOUT</button>
            </>
          : <button onClick={() => setPage('login')}>LOGIN</button>
        }
      </div>

      <Notify errorMessage={errorMessage} />
      <Authors show={page === 'authors'} setError={notify} />
      <Books show={page === 'books'} setError={notify} />
      {token
        ? <NewBook show={page === 'add'} setError={notify} />
        : <LoginForm
            show={page === 'login'}
            setPage={setPage}
            setToken={setToken}
            setError={notify}
          />
      }

    </div>
  )
}

export default App
