import React from 'react'
import { useSelector } from 'react-redux'
// import PropTypes from 'prop-types'

const Message = () => {
  const notification = useSelector((n) => n.notification)

  const style = {
    border: 'solid',
    padding: 5,
    borderWidth: 1
  }

  if (notification)
    return <p style={style}> {notification} </p>
  else
    return <div></div>
}

Message.displayName = 'Message'


export default Message
