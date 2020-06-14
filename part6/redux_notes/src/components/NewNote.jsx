import { createNote } from '../reducers/noteReducer'

import React from 'react'
import { useDispatch } from 'react-redux'

function NewNote () {
  const dispatch = useDispatch()

  const addNote = async (event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''
    dispatch(createNote(content))
  }

  return (
    <form onSubmit={addNote}>
      <input name="note" />
      <button type="submit">ADD</button>
    </form>
  )
}

export default NewNote