import PromisePolyfill from 'promise-polyfill'
import React from 'react'
import { render } from 'react-dom'
import App from './App'

if (!window.Promise) window.Promise = PromisePolyfill

render(
  <App />,
  document.getElementById('root')
)