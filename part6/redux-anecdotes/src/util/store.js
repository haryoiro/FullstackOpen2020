import anecdotesReducer from '../reducers/anecdoteReducer'
import notificationReducer from '../reducers/notificationReducer'
import filterReducer from '../reducers/filterReducer'

import { initializeAnecdotes } from '../actions/index'

import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

const reducer = () => combineReducers({
  anecdotes: anecdotesReducer,
  notification: notificationReducer,
  filter: filterReducer,
})

const store = createStore(
  reducer(),
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

store.dispatch(initializeAnecdotes())
export default store