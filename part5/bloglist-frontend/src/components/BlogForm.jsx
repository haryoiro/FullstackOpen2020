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
    <form onSubmit={addBlog}>
      <h3>CREATE NEW</h3>
      <p>TITLE    <input type="text" value={title} onChange={handleChangeTitle} autoComplete="off" /></p>
      <p>AUTHOR   <input type="text" value={author} onChange={handleChangeAuthor} autoComplete="off" /> </p>
      <p>URL      <input type="text" value={url} onChange={handleChangeUrl} autoComplete="off" /> </p>
      <input type="submit" value="POST" />
    </form>
  )
}

BlogForm.displayName = 'BlogForm'

BlogForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
}

export default BlogForm
