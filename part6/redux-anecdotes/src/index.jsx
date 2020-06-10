import App from './App'
import store from './util/store';

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)