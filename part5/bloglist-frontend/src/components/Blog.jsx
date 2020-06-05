import React, { useState } from 'react'
import PropTypes from 'prop-types'

import Togglable from './Togglable'

const Blog = ({ blog, updateLikes, handleDelete }) => {
  const [likes, setLikes] = useState(blog.likes)
  const [visible, setVisible] = useState(true)

  const style = {
    margin: '5px 0',
    padding: '5px 10px',
    border: '1px solid black',
  }

  const hideWhenVisible = { display: visible ? '' : 'none' }
  const showWhenVisible = { display: visible ? 'none' : '' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const addLikes = (event) => {
    event.preventDefault()
    setLikes(likes + 1)
    updateLikes({
      ...blog,
    })
  }

  const deletePost = (event) => {
    event.preventDefault()
    handleDelete({
      ...blog,
    })
  }

  const isOwner = (username) => {
    const currentUser = JSON.parse(window.localStorage.loggedInBlogUser).username
    return currentUser === username
  }

  const isUsername = (currBlog) => (currBlog.user !== undefined
    ? isOwner(currBlog.user.username)
    : false)


  return (
    <div key={blog.id} style={style} className="blog-list">
      <span>{`${blog.title} `}</span>
      <button type="submit" onClick={toggleVisibility} style={hideWhenVisible} className="show-button">SHOW</button>
      <button type="submit" onClick={toggleVisibility} style={showWhenVisible} className="hide-button">HIDE</button>
      <div style={showWhenVisible} className="blog-details">
        { blog.url } <br />
        { likes } <input type="submit" onClick={addLikes} value="LIKE" className="like-button" /> <br />
        { blog.author } <br />
        {isUsername(blog)
          && <input type="submit" onClick={deletePost} value="DELETE" />}
      </div>
    </div>
  )
}

Blog.displayName = 'Blog'

Blog.defaultProps = {
  blog: null,
  handleDelete: null,
}

Blog.propTypes = {
  blog: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    url: PropTypes.string,
    author: PropTypes.string,
    likes: PropTypes.number,
  }),
  updateLikes: PropTypes.func.isRequired,
  handleDelete: PropTypes.func,
}

export default Blog
