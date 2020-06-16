import {
  addVote,
  pushNotification
} from '../actions/index'

import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

const AnecdotesList = () => {
  const anecdotes = useSelector((state) => state.anecdotes)
  const filter = useSelector((state) => state.filter)
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(addVote(id))
    const anecdote = anecdotes.find((a) => a.id === id)
    dispatch(pushNotification(`you voted '${anecdote.content}'`, 10))
  }

  const sortByVote = (a, b) => {
    if (a.votes < b.votes) return 1
    if (a.votes > b.votes) return -1
    return 0
  }

  return (
    <>
    {anecdotes
      .sort(sortByVote)
      .filter((n) => n.content.includes(filter))
      .map(anecdote =>
      <div key={anecdote.id}>
        <div> {anecdote.content} </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => vote(anecdote.id)}>vote</button>
        </div>
      </div>
    )}
    </>
  )
}

export default AnecdotesList