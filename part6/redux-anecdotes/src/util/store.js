import anecdotesReducer from '../reducers/anecdoteReducer'
import notificationReducer from '../reducers/notificationReducer'
import filterReducer from '../reducers/filterReducer'

import anecdoteServices from '../services/anecdote'
import { initializeAnecdotes } from '../actions/index'

import { createStore, combineReducers } from 'redux'

const reducer = combineReducers({
  anecdotes: anecdotesReducer,
  notification: notificationReducer,
  filter: filterReducer,
})

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

anecdoteServices.getAll().then((anecs) =>
  store.dispatch(initializeAnecdotes(anecs))
)

export default store