import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './index.css'

const useNotes = (url) => {
  const [notes, setNotes] = useState([])
  useEffect(() => {
    axios
      .get(url)
      .then((res) => 
        setNotes(res.data)
      )
  }, [url])
  return notes
}

export default function App() {
  const [counter, setCounter] = useState(0)
  const [values, setValues] = useState([])
  const notes = useNotes(BACKEND_URL)

  function handleClick() {
    setCounter(counter + 1)
    setValues([...values, counter])
  }

  return (
    <div className="container">
      Hello Webpack {counter} clicks
      <button onClick={handleClick}>plus</button>
      <div>{notes.length} notes on server {BACKEND_URL}</div>
    </div>
  )
}
