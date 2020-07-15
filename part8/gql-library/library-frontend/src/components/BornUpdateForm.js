import React, { useState } from 'react';
import { useMutation } from '@apollo/client'
// queries
import {
  ALL_AUTHORS,
  EDIT_AUTHORS_BORN,
} from '../queries'

//{__typename: "Authors", name: "Fyodor Dostoevsky", bookCount: 2, born: 1821, id: "afa5b6f1-344d-11e9-a414-719
export default function BornUpdateForm({ authors }) {
  const [current, setCurrent] = useState(authors.data.allAuthors[0].name)
  const [bornTo, setBornTo] = useState(2000)

  const [ changeAuthorsBorn ] = useMutation(EDIT_AUTHORS_BORN, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  if (authors.loading) return <div>Now Loading...</div>

  function handleChangeSelected(e) {
    e.preventDefault()
    setCurrent(e.target.value)
  }
  function handleChangeBornTo(e) {
    if (!e.target.value) setBornTo(0)
    setBornTo(e.target.value)
  }
  function handleSubmitAuthorsBorn(e) {
    e.preventDefault()
    changeAuthorsBorn({ variables: { name: current, setBornTo: Number(bornTo) } })
    setBornTo(0)
  }

  return (
    <form onSubmit={handleSubmitAuthorsBorn}>
      <select value={current} onChange={handleChangeSelected}>
        <option selected value="None">None</option>
        {authors.data.allAuthors.map(a =>
          <option value={a.name} key={a.id}>{a.name}</option>
        )}
      </select><br />
      <input type="number" value={bornTo} onChange={handleChangeBornTo} />
      <input type="submit" value="UPDATE AUTHOR" />
    </form>
  )
}