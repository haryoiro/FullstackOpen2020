import React from 'react'
// import { useSelector } from 'react-redux'

import Blogs from './components/Blogs'
import BlogForm from './components/BlogForm'
import LoggedIn from './components/LoggedIn'
import LoginForm from './components/LoginForm'
import Message from './components/Message'


import './App.css'

import blogService from './services/blogs'
import { useUserSession } from './Hooks/index'

const App = () => {
  const [username, setToken] = useUserSession(blogService)
  setToken(window.localStorage.getItem('loggedInBlogUser'))

  function Content() {
    if (username !== null) {
      return (
        <div>
          <LoggedIn />
          <BlogForm />
          <Blogs />
        </div>
      )
    } else {
      return <LoginForm />
    }
  }

  return (
    <div>
      <h2>BLOGS</h2>
      <Message />
      <Content />
    </div>
  )
}


export default App
