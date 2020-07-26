import React from 'react'
import { useQuery } from '@apollo/client'
// Queries
import { ALL_BOOKS } from '../queries'

const Books = ({ setError, show }) => {
  const books = useQuery(ALL_BOOKS , { pollInterval: 2000 })
  if (!show) return null
  if (books.loading) return <div>Now Loading...</div>

  return (
    <div>
      <h2>books</h2>
      <table>
        <tbody>
          <tr>
            <th> TITLE     </th>
            <th> AUTHOR    </th>
            <th> PUBLISHED </th>
          </tr>
          {books.data.allBooks.map(a =>
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Books