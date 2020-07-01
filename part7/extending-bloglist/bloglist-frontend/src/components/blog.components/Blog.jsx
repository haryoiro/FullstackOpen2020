import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  useParams,
  useHistory
} from 'react-router-dom'

import {
  incrementLikes,
  removeBlogPost,
  pushNotification,
  addAnonymousComment,
} from '../../actions/index'
import { useField } from '../../Hooks'

function Blog() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const blogs = useSelector((s) => s.blogs)
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
      <CommentList comments={blog.comments}/>
      <CommentForm blog={blog}/>
    </div>
  )
}

// 投稿ユーザのみに表示される投稿削除ボタン
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

function CommentList({comments}) {
  return (
    <ul>
    {comments.map((c) => (
      <li key={c.id}>{c.comment}</li>
    ))}
    </ul>
  )
}

function CommentForm({ blog }) {
  const dispatch = useDispatch()
  const form = useField('text')

  async function handleCommentPost(event) {
    event.preventDefault()
    const newComment = form.props.value
    form.onClear()
    try {
      await dispatch(addAnonymousComment(blog.id, blog, newComment))
      await dispatch(pushNotification('comment posted'))
    } catch (err) {
      await dispatch(pushNotification(err))
    }
  }

  return (
    <form onSubmit={handleCommentPost}>
      <input {...form.props} />
      <button>COMMENT</button>
    </form>
  )
}

Blog.displayName = 'Blog'

export default Blog
