import anecdotesReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'

import { createStore, combineReducers } from 'redux'

const reducer = combineReducers({
  anecdotes: anecdotesReducer,
  notifications: notificationReducer,
})

const store = createStore(reducer)

export default store