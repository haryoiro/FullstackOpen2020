const getId = () => (100000 * Math.random()).toFixed(0)

// *------ Anecdotes ---------
export const addVote = (id) => {
  return {
    type: 'ADD_VOTE',
    data: { id }
  }
}

export const createAnecdotes = (content) => {
  return {
    type: 'CREATE_ANECDOTES',
    data: {
      content: content,
      id: getId(),
      votes:0,
    }
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
