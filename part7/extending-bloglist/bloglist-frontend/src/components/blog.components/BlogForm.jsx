import { useField, useToggleVisibility } from '../../Hooks/index'
import { createBlog, pushNotification } from '../../actions/index'

import React from 'react'
import { useDispatch } from 'react-redux'


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

function BlogForm() {
  const dispatch = useDispatch()
  const visible = useToggleVisibility()

  const title  = useField('text')
  const author  = useField('text')
  const url     = useField('text')

  async function addBlog(event) {
    event.preventDefault()
    try {
      await dispatch(createBlog({
        title: title.props.value,
        author: author.props.value,
        url: url.props.value
      }))
      await dispatch(pushNotification(`${title.props.value} is added`))
      title.onClear()
      author.onClear()
      url.onClear()
      visible.onToggle()
    } catch (err) {
      await dispatch(pushNotification(err))
    }
  }

  return (
    <Togglable visible={visible}>
        <form onSubmit={addBlog} id="blogForm">
          <h3>CREATE NEW</h3>
          <div>TITLE    <input { ...title.props  } /></div>
          <div>AUTHOR   <input { ...author.props } /></div>
          <div>URL      <input { ...url.props    } /></div>
          <button type="submit">POST</button>
        </form>
    </Togglable>
  )
}

BlogForm.displayName = 'BlogForm'

export default BlogForm
