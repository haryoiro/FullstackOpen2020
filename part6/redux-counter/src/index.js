import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'
import './App.css';

const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    case 'ZERO':
      return 0
    default:
      return state
  }
}

const store = createStore(counterReducer)

function App() {
  const increment = () => {
    store.dispatch({ type: 'INCREMENT' })
  }
  const decrement = () => {
    store.dispatch({ type: 'DECREMENT' })
  }
  const zero = () => {
    store.dispatch({ type: 'ZERO' })
  }

  return (
    <>
      <p>{store.getState()}</p>
      <button onClick={increment}>+</button>
      <button onClick={zero}>0</button>
      <button onClick={decrement}>-</button>
    </>
  )
}

const renderApp = () => {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  )
}

renderApp()
store.subscribe(renderApp)