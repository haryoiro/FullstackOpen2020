import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import {
  useParams,
  useHistory
} from 'react-router-dom'

import {
  incrementLikes,
  removeBlogPost,
  pushNotification,
} from '../../actions/index'

function Blog() {
  const dispatch = useDispatch()
  const blogs = useSelector((s) => s.blogs)
  const { id } = useParams()
  const blog = blogs?.find((n) => n.id === id)

  if (!blog) return null

  async function addLikes(event) {
    event.preventDefault()
    try {
      await dispatch(incrementLikes(blog.id, blog))
      await dispatch(pushNotification(`voted at : ${blog.title}`))
    } catch (err) {
      await dispatch(pushNotification(err))
    }
  }

  return (
    <div key={blog.id} >
      <h3>{blog.title}</h3>
      <div>
        <a href={blog.url} target="_blank" rel="noopener noreferrer">{blog.url}</a>
        <div>{blog.likes} <button onClick={addLikes}>LIKE</button> </div>
        <div>{blog.author}</div>
        <UserOnlyDeleteForm blog={blog}/>
      </div>
    </div>
  )
}

function UserOnlyDeleteForm({ blog }) {
  const dispatch = useDispatch()
  const history = useHistory()

  async function deletePost(event) {
    event.preventDefault()
    try {
      await dispatch(removeBlogPost(blog.id))
      await dispatch(pushNotification(`${blog.title} is removed`))
      history.push('/')
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

  return isUsername(blog)
    ? <button onClick={deletePost}>DELETE</button>
    : null
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
