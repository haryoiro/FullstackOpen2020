import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom'

import Blog from './components/blog.components/Blog'
import BlogList from './components/blog.components/BlogList'
import BlogForm from './components/blog.components/BlogForm'
import UsersBody from './components/user.components/UserBody'
import LoggedIn from './components/LoggedIn'
import LoginForm from './components/LoginForm'
import Message from './components/Message'

import './App.css'

import blogService from './services/blogs'
import { useUserSession } from './Hooks/index'

const App = () => {
  const [username, setToken] = useUserSession(blogService)
  // ログイントークンをLocalStorageへ格納
  setToken(window.localStorage.getItem('loggedInBlogUser'))

  function BlogBody({username}) {
    if (username !== null) {
      return (
        <div>
          <BlogForm />
          <BlogList />
        </div>
      )
    } else {
      return <LoginForm />
    }
  }

  return (
    <Router>
        <Header />
        <div className="container">
          <Message />
          <Switch>
            <Route exact path="/">

            <h2>BLOGS</h2>
              <BlogBody username={username}/>
            </Route>
            <Route path="/users">
              <UsersBody />
            </Route>
            <Route path="/blogs/:id">
              <Blog />
            </Route>
          </Switch>
        </div>
      </Router>
  )
}

function Header() {

  return (
    <div className="header-container">
      <Link to="/" ><h5 className="header-container-links">BLOGS</h5></Link>
      <Link to="users"><h5 className="header-container-links">USERS</h5></Link>
      <LoggedIn />
    </div>
  )
}

function NavBar() {

}

function NavLink() {
    
}
export default App
