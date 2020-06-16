import { addVote, pushNotification } from '../actions/index'

import React from 'react'
import { connect } from 'react-redux'

const AnecdotesList = (props) => {
  const vote = (id) => {
    props.addVote(id)
    const anecdote = props.anecdotes.find((a) => a.id === id)
    props.pushNotification(`you voted '${anecdote.content}'`, 10)
  }

  const sortByVote = (a, b) => {
    if (a.votes < b.votes) return 1
    if (a.votes > b.votes) return -1
    return 0
  }

  return (
    <>
    {props.anecdotes
      .sort(sortByVote)
      .filter((n) => n.content.includes(props.filter))
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

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter,
  }
}

export default connect(
  mapStateToProps,
  { addVote, pushNotification }
)(AnecdotesList)