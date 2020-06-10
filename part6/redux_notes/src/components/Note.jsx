import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { toggleImportanceOf } from '../Reducers/noteReducer'

function Note ({ note, onClick}) {
  return (
    <li onClick={() => onClick(note.id)}>
      {note.content} <strong>{note.important ? 'important' : ''}</strong>
    </li>
  )
}

function Notes () {
  const dispatch = useDispatch()
  const notes = useSelector(({filter, notes}) => {
    if (filter === 'ALL') {
      return notes
    }
    return filter === 'IMPORTANT'
      ? notes.filter((note) => note.important)
      : notes.filter((note) => !note.important)
  })

  const toggleImportance = (id) => {
    dispatch(toggleImportanceOf(id))
  }
  return (
    <ul>
    {notes.map((note) =>
      <Note
        key={note.id}
        note={note}
        onClick={toggleImportance}
        />
    )}
    </ul>
  )
}

export default Notes