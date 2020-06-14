import {
  createAnecdotes,
  pushNotification
} from '../actions/index'

import React from 'react'
import { useDispatch } from 'react-redux'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdotes = (event) => {
    event.preventDefault()
    const content = event.target.anecdotes.value

    dispatch(createAnecdotes(content))
    notifier(content)

    event.target.anecdotes.value = ''
  }

  const notifier = (content) => {
    dispatch(pushNotification(`"${content}" added`))
    setInterval(() => {dispatch(pushNotification(null))}, 5000)
  }

  return (
    <>
    <h2>create new</h2>
    <form onSubmit={addAnecdotes}>
      <div><input name="anecdotes"/></div>
      <button type="submit">create</button>
    </form>
    </>
  )
}

export default AnecdoteForm