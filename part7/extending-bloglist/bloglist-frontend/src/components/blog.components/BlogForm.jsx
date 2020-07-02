import { useField, useToggleVisibility } from '../../Hooks/index'
import { createBlog, pushNotification } from '../../actions/index'

import React from 'react'
import { useDispatch } from 'react-redux'

import Togglable from '../Togglable'
// function Togglable({ open="OPEN", close="CLOSE", visible, children }) {
//   return (
//     <>
//       <button onClick={visible.onToggle} style={visible.showWhenVisible}>{open}</button>
//       <div style={visible.hideWhenVisible}>
//         {children}
//       <button onClick={visible.onToggle}>{close}</button>
//       </div>
//     </>
//   )
// }

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
    <Togglable visible={visible} open="NEW POST" close="CANCEL" customClass="blog-form-main">
        <form onSubmit={addBlog} className="body-main-blog-form">
          <table className="body-main-blog-form-table">
            <strong>CREATE NEW</strong>
            <tbody>
              <tr>
                <td>TITLE </td><td><input { ...title.props  } /></td>
              </tr>
              <tr>
                <td>AUTHOR</td><td><input { ...author.props } /></td>
              </tr>
              <tr>
                <td>URL   </td><td><input { ...url.props    } /></td>
              </tr>
            </tbody>
          </table>
          <button>POST</button>
        </form>
    </Togglable>
  )
}

BlogForm.displayName = 'BlogForm'

export default BlogForm
