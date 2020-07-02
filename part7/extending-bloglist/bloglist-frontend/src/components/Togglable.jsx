import React from 'react'

const Togglable = ({ open="OPEN", close="CLOSE", visible, children, customClass=null }) => {
  return (
    <div className="togglable">
      <div style={visible.showWhenVisible} className={`body-container-form-closed ${customClass}`}>
        <button onClick={visible.onToggle} className={`body-container-form-button ${customClass}`}>
          {open}
        </button>
      </div>
      <div style={visible.hideWhenVisible} className={`body-container-form-expanded ${customClass}`}>
        <button onClick={visible.onToggle} className={`body-container-form-button ${customClass}`}>
          {close}
        </button>
        {children}
      </div>
    </div>
  )
}

Togglable.displayname = 'Togglable'

export default Togglable