import {
  createAnecdotes,
  pushNotification
} from '../actions/index'

import anecdotesServices from '../services/anecdote'

import React from 'react'
import { useDispatch } from 'react-redux'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdotes = async (event) => {
    event.preventDefault()
    const content = event.target.anecdotes.value
    event.target.anecdotes.value = ''
    const newAnecdote = await anecdotesServices.createNew(content)
    dispatch(createAnecdotes(newAnecdote))
    notifier(content)
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