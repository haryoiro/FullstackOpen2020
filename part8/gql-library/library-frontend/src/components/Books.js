import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
// Queries
import { ALL_BOOKS } from '../queries'

const Books = ({ setError, show }) => {
  const { loading, error, data } = useQuery(ALL_BOOKS)
  const [filtered, setFiltered] = useState([])
  const [genre, setGenre] = useState('ALL')

  useEffect(() => {
    if (data) {
      let all = genre === 'ALL'
        ? data.allBooks
        : data.allBooks.filter((a) => a.genres === genre)
      setFiltered(all)
    }
  }, [data, genre])

  if (!show) return null
  if (loading) return <div>Now Loading...</div>
  if (error) setError(error.message)

  return (
    <div>
      <h2>BOOKS</h2>
      <table>
        <tbody>
          <tr>
            <th>           </th>
            <th> AUTHOR    </th>
            <th> PUBLISHED </th>
          </tr>
          {filtered.map(a =>
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <button onClick={() => setGenre('ALL')}>ALL</button>
      {data && data.allBooks.map((a) =>
        <button key={a.id} onClick={() => setGenre(a.genres)}>{a.genres}</button>
      )}
    </div>
  )
}

export default Books