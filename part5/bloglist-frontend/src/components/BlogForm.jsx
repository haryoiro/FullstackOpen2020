import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ handleSubmit }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleChangeTitle = (event) => {
    setTitle(event.target.value)
  }

  const handleChangeAuthor = (event) => {
    setAuthor(event.target.value)
  }

  const handleChangeUrl = (event) => {
    setUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()

    handleSubmit({
      title,
      author,
      url,
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form onSubmit={addBlog} id="blogForm">
      <h3>CREATE NEW</h3>
      <p>TITLE    <input type="text" value={title} onChange={handleChangeTitle} autoComplete="off" id="titleForm" /></p>
      <p>AUTHOR   <input type="text" value={author} onChange={handleChangeAuthor} autoComplete="off" id="authorForm" /> </p>
      <p>URL      <input type="text" value={url} onChange={handleChangeUrl} autoComplete="off" id="urlForm" /> </p>
      <input type="submit" value="POST" id="postBlogSubmit"/>
    </form>
  )
}

BlogForm.displayName = 'BlogForm'

BlogForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
}

export default BlogForm
