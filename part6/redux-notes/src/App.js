import './App.css'
import NewNote from './components/NewNote'
import Note from './components/Note'
import VisibilityFilter from "./components/VisibilityFilter"
import { initializeNotes } from './reducers/noteReducer'

import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeNotes())
  }, [dispatch])

  return (
    <div>
      <NewNote />
      <VisibilityFilter />
      <Note />
    </div>
  )
}

export default App
