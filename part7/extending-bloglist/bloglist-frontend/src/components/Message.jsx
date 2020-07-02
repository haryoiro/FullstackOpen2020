import React from 'react'
import { useSelector } from 'react-redux'
// import PropTypes from 'prop-types'

const Message = () => {
  const notification = useSelector((n) => n.notification)

  if (notification) {
    return <div className="notification">{notification.toUpperCase()}</div>
  }
  else {
    return <div></div>
  }
}

Message.displayName = 'Message'


export default Message
