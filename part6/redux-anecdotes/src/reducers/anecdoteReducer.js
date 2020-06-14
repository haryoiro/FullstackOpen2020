export const asObject = (anecdote) => {
  return {
    content: anecdote,
    votes: 0
  }
}

const anecdotesReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_VOTE':
      const id = action.data.id
      const voteToAnec = state.filter((n) => n.id === id)
      const votedAnec = {
        ...voteToAnec[0],
        votes: voteToAnec[0].votes + 1,
      }
      return state.map((n) => n.id === id ? votedAnec : n)
    case 'INIT_ANECDOTES':
      return action.data
    case 'CREATE_ANECDOTES':
      return [...state, action.data]
    default:
      return state
  }
}

export default anecdotesReducer