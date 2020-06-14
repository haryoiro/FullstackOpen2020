export const initializeAnecdotes = (anecs) => ({
  type: 'INIT_ANECDOTES',
  data: anecs,
})

// *------ Anecdotes ---------
export const addVote = (id) => {
  return {
    type: 'ADD_VOTE',
    data: { id }
  }
}

export const createAnecdotes = (anecs) => {
  return {
    type: 'CREATE_ANECDOTES',
    data: {
      content: anecs.content,
      id: anecs.id,
      votes: 0,
    },
  }
}

// *------ Notification ---------*
export const pushNotification = (message) => {
  return {
    type: 'PUSH_NOTIFICATION',
    data: message,
  }
}

// *------ Filtering ---------*
export const filterByWord = (data) => ({
  type: 'SET_FILTER_WORD',
  data,
})
