import React from 'react'

const Togglable = ({ open="OPEN", close="CLOSE", visible, children }) => {
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
Togglable.displayname = 'Togglable'

export default Togglable