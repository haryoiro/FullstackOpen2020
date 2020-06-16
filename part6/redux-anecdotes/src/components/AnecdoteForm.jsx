import { createAnecdotes, pushNotification } from '../actions/index'

import React from 'react'
import { connect } from 'react-redux'

const AnecdoteForm = (props) => {

  const addAnecdotes = (event) => {
    event.preventDefault()
    const content = event.target.anecdotes.value
    event.target.anecdotes.value = ''
    props.createAnecdotes(content)
    props.pushNotification(`new anecdote '${content}'`)
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

export default connect(
  null,
  { createAnecdotes, pushNotification }
  )(AnecdoteForm)