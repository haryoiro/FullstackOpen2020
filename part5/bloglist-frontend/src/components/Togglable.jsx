import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(true)

  const hideWhenVisible = { display: visible ? '' : 'none' }
  const showWhenVisible = { display: visible ? 'none' : '' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => ({ toggleVisibility }))

  return (
    <>
      <button type="submit" onClick={toggleVisibility} style={hideWhenVisible} className="hide-button">{props.buttonLabel}</button>
      <button type="submit" onClick={toggleVisibility} style={showWhenVisible} className="visible-button">{props.secondButtonLabel}</button>
      <div style={showWhenVisible}>{props.children}</div>
    </>
  )
})

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  secondButtonLabel: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}

export default Togglable
