import React, { useState, useEffect } from 'react'

import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoggedIn from './components/LoggedIn'
import LoginForm from './components/LoginForm'
import Message from './components/Message'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginService from './services/login'

import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState(null)
  const [errorMessage, setErrorMessage] = useState({ message: null, error: false })

  const blogFormRef = React.createRef()

  useEffect(() => {
    blogService
      .getAll()
      .then((returnedBlogs) => {
        setBlogs(returnedBlogs.sort(sortHelper))
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUsername(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (loginObject) => {
    try {
      const user = await loginService.login(loginObject)

      window.localStorage.setItem('loggedInBlogUser', JSON.stringify(user))
      await blogService.setToken(user.token)

      setUsername(user)
    } catch (err) {
      setErrorMessage({ message: 'Wrong username or password', status: true })

      setTimeout(() => { setErrorMessage({ message: null, error: false }) }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()

    window.localStorage.clear()
    setUsername(null)

    setErrorMessage({ message: 'Logout success', status: false })
    setTimeout(() => { setErrorMessage({ message: null, error: false }) }, 5000)
  }

  const handleBlogSubmit = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()

      const addedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(addedBlog))

      setErrorMessage({ message: `a new blog ${blogObject.title} added`, status: false })
      setTimeout(() => { setErrorMessage({ message: null, error: false }) }, 5000)
    } catch (err) {
      setErrorMessage({ message: `${err}`, status: true })
      setTimeout(() => { setErrorMessage({ message: null, error: false }) }, 5000)
    }
  }

  const updateLikes = async (event) => {
    const updateBlog = await blogs.find((n) => n.id === event.id)

    updateBlog.likes += 1
    delete updateBlog.user

    const updatedBlogs = await blogService.addLikes(event.id, updateBlog)
    await setBlogs(blogs.map((b) => b.id !== updatedBlogs.id ? b : updatedBlogs).sort(sortHelper))
  }

  const sortHelper = (a, b) => {
    if (a.likes < b.likes) return 1
    if (a.likes > b.likes) return -1
    return 0
  }

  const handleDelete = async (event) => {
    try {
      if (window.confirm('Remove?')) {
        await blogService.deleteBlog(event.id)
        setBlogs(blogs.filter((n) => n.id !== event.id))
      }
    } catch (err) {
      setErrorMessage(err, false)
      setTimeout(() => { setErrorMessage({ message: null, error: false }) }, 5000)
    }
  }

  return (
    <div>
      <h2>BLOGS</h2>
      <Message message={errorMessage} />
      {username !== null
        ? (
          <div>
            <LoggedIn handleLogout={handleLogout} username={username} />
            <Togglable buttonLabel="NEW POST" ref={blogFormRef} secondButtonLabel="CANCEL">
              <BlogForm handleSubmit={handleBlogSubmit} />
            </Togglable>
            <div>
              {blogs.map((blog) => (
                <Blog
                  key={blog.id}
                  blog={blog}
                  updateLikes={updateLikes}
                  handleDelete={handleDelete}
                />
              ))}
            </div>
          </div>
        ) : (
          <Togglable buttonLabel="LOGIN" secondButtonLabel="CANCEL">
            <LoginForm handleLogin={handleLogin} />
          </Togglable>
        )}
    </div>
  )
}


export default App
