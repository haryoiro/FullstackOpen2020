import './App.css'
import NewNote from './components/NewNote'
import Note from './components/Note'
import VisibilityFilter from "./components/VisibilityFilter";

import React from 'react'

function App() {
  return (
    <div>
      <NewNote />
      <VisibilityFilter />
      <Note />
    </div>
  )
}

export default App
