import React from 'react'

const BookList = ({ bookList }) => {
  return (
    <table>
      <tbody>
        <tr>
          <th>           </th>
          <th> AUTHOR    </th>
          <th> PUBLISHED </th>
          <th> GENRES     </th>
        </tr>
        {bookList.map(a =>
          <tr key={a.id}>
            <td>{a.title}</td>
            <td>{a.author.name}</td>
            <td>{a.published}</td>
            <td>{a.genres}</td>
          </tr>
        )}
      </tbody>
    </table>
  )
}

export default BookList