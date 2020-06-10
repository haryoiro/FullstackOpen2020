import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'
import { createStore, combineReducers } from 'redux'
// import { composeWidthDevTools } from 'redux-devtools-extension'
import { Provider } from 'react-redux'

import noteReducer from './Reducers/noteReducer'
import filterReducer from './Reducers/filterReducer'

import { createNote } from './Reducers/noteReducer'
import { filterChange } from './Reducers/filterReducer'

const reducer = combineReducers({
  notes: noteReducer,
  filter: filterReducer,
})

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
)

store.subscribe(() => console.log(store.getState()))
store.dispatch(filterChange('IMPORTANT'))
store.dispatch(createNote('combineReducers forms one reducer from many simple reducers'))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
