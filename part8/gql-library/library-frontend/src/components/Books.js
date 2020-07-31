import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
// Queries
import { ALL_BOOKS } from '../queries'

import BookList from './BookList'

const Books = ({ setError, show }) => {
  const { loading, error, data } = useQuery(ALL_BOOKS)
  const [allGenres, setAllGenres] = useState([])
  const [filtered, setFiltered] = useState([])
  const [genre, setGenre] = useState('ALL')

  useEffect(() => {
    if (data) {
      let allGenresFromArray = [...new Set(data.allBooks.map((a) => a.genres).flat())]
      setAllGenres(allGenresFromArray)

      let returned = genre === 'ALL'
        ? data.allBooks
        : data.allBooks.filter((a) => a.genres == genre)
      setFiltered(returned)
    }
  }, [data, genre])

  if (!show) return null
  if (loading) return <div>Now Loading...</div>
  if (error) setError(error.message)

  return (
    <div>
      <h2>BOOKS</h2>
      <BookList bookList={filtered} />
      <button onClick={() => setGenre('ALL')}>ALL</button>
      {data && allGenres.map((a) =>
        <button key={a} onClick={() => setGenre(a)}>{a}</button>
      )}
    </div>
  )
}

export default Books