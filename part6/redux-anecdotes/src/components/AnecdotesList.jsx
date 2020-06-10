import { addVote } from '../reducers/anecdoteReducer'

import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

const AnecdotesList = (props) => {
  const anecdotes = useSelector((state) => state)
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(addVote(id))
  }

  const sortByVote = (a, b) => {
    if (a.votes < b.votes) return 1
    if (a.votes > b.votes) return -1
    return 0
  }

  return (
    <>
    {anecdotes.sort(sortByVote).map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
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