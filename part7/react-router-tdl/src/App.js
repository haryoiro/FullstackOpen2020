import React from 'react'
import {
  BrowserRouter as Router,
  Switch, Route
} from 'react-router-dom'
import './App.css'
import Nav from './Components/Nav'
import About from './Components/About'
import Shop from './Components/Shop'
import Home from './Components/Home'

function App() {
  return (
    <Router className="App">
      <Nav />
      <Switch>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/shop">
          <Shop />
        </Route>
      </Switch>
    </Router>
  )
}

export default App;
