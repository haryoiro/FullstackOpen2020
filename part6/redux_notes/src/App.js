import './App.css'
import NewNote from './components/NewNote'
import Note from './components/Note'
import VisibilityFilter from "./components/VisibilityFilter"
import noteService from './services/notes'
import { initializeNotes } from './reducers/noteReducer'

import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    noteService
      .getAll().then((notes) => dispatch(initializeNotes(notes)))
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <NewNote />
      <VisibilityFilter />
      <Note />
    </div>
  )
}

export default App
