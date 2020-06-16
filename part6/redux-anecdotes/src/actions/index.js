import anecdotesService from '../services/anecdote'

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdotesService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

// *------ Anecdotes ---------
export const addVote = (id) => {
  return {
    type: 'ADD_VOTE',
    data: { id }
  }
}

export const createAnecdotes = (anecs) => {
  return async dispatch => {
    const newAnecs = await anecdotesService.createNew(anecs)
    dispatch({
      type: 'CREATE_ANECDOTES',
      data: {
        content: newAnecs.content,
        id: newAnecs.id,
        votes: 0,
      }
    })
  }
}

// *------ Notification ---------*
export const pushNotification = (message, second=3) => {
  return async dispatch => {
    await dispatch({
      type: 'PUSH_NOTIFICATION',
      data: message,
    })
    await setTimeout(() => {
      dispatch({
        type: 'PUSH_NOTIFICATION',
        data: null,
      })
    }, second*100)
  }
}

// *------ Filtering ---------*
export const filterByWord = (data) => ({
  type: 'SET_FILTER_WORD',
  data: data,
})
