import React from 'react'

const Languages = ({ languages }) => (
  <>
    <h2>languages</h2>
    <ul>
    {languages.map(x => (
      <li key={x.iso639_1}>{x.name}</li>
    ))}
    </ul>
  </>
)

export default Languages