import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'

import noteReducer, { initializeNotes } from './reducers/noteReducer'
import filterReducer from './reducers/filterReducer'

import noteService from './services/notes'

const reducer = combineReducers({
  notes: noteReducer,
  filter: filterReducer,
})

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
)

noteService.getAll().then((notes) =>
  store.dispatch(initializeNotes(notes))
)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
