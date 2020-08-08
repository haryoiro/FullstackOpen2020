import React, { useState } from 'react'
import { useSubscription, useApolloClient } from '@apollo/client'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommend from './components/Recommend'

import { ALL_BOOKS, BOOK_ADDED } from './queries'

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
  const [token, setToken] = useState(localStorage.getItem('library-number-user-token'))
  const client = useApolloClient()


  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      console.log(addedBook)
      updateCacheWith (addedBook)
      notify(`${addedBook.title} ADDED`)
    }
  })

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) =>
      set.map(p => p.id).includes(object.id)

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks : dataInStore.allBooks.concat(addedBook) }
      })
    }
  }

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
            <button onClick={() => setPage('recommend')}>RECOMMEND</button>
            <button onClick={() => logout()}>LOGOUT</button>
            </>
          : <button onClick={() => setPage('login')}>LOGIN</button>
        }
      </div>

      <Notify errorMessage={errorMessage} />
      <Authors show={page === 'authors'} setError={notify} />
      <Books show={page === 'books'} setError={notify} />
      <Recommend show={page === 'recommend'} setError={notify} />
      {token
        ? <NewBook show={page === 'add'} setError={notify} updateCacheWith={updateCacheWith} />
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
