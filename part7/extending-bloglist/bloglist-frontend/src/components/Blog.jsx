import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'

import {
  incrementLikes,
  removeBlogPost,
  pushNotification,
} from '../actions/index'

import { useToggleVisibility } from '../Hooks/index'

function Togglable({ open="OPEN", close="CLOSE", visible, children }) {
  return (
    <>
      <button onClick={visible.onToggle} style={visible.showWhenVisible}>{open}</button>
      <div style={visible.hideWhenVisible}>
        {children}
      <button onClick={visible.onToggle}>{close}</button>
      </div>
    </>
  )
}

function Blog({ blog }) {
  const dispatch = useDispatch()
  const visible = useToggleVisibility()

  async function addLikes(event) {
    event.preventDefault()
    try {
      await dispatch(incrementLikes(blog.id, blog))
      await dispatch(pushNotification(`voted at : ${blog.title}`))
    } catch (err) {
      await dispatch(pushNotification(err))
    }
  }

  async function deletePost(event) {
    event.preventDefault()
    try {
      await dispatch(removeBlogPost(blog.id))
      await dispatch(pushNotification(`${blog.title} is removed`))
    } catch (err) {
      await dispatch(pushNotification(err))
    }
  }

  function isOwner(postUser) {
    const { username } = JSON.parse(window.localStorage.loggedInBlogUser)
    return postUser === username
  }

  function isUsername(currBlog) {
    return currBlog.user !== undefined
        ? isOwner(currBlog.user.username)
        : false
  }

  function DeleteForm() {
    return isUsername(blog)
      ? <button onClick={deletePost}>DELETE</button>
      : null
  }

  return (
    <div key={blog.id} className="blog-list">
      <div>{blog.title}</div>
      <Togglable open="SHOW" close="CLOSE"visible={visible}>
        <div className="blog-details">
          {blog.url} <br />
          {blog.likes} <button onClick={addLikes}>LIKE</button> <br />
          {blog.author} <br />
          <DeleteForm />
        </div>
      </Togglable>
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
}

export default Blog
