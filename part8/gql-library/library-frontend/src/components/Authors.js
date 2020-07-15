import React from 'react'
import { useQuery } from '@apollo/client'
// Components
import BornUpdateForm from './BornUpdateForm'
// GraphQL-Queries
import { ALL_AUTHORS } from '../queries'

const Authors = (props) => {
  const authors = useQuery(ALL_AUTHORS)
  if (!props.show) return null
  if (authors.loading) return <div>now loading...</div>

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.data.allAuthors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <BornUpdateForm authors={authors} />
    </div>
  )
}

export default Authors
