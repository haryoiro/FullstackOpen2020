import React from 'react'
import PropTypes from 'prop-types'

const Message = ({ message }) => (
  <div id="message">
    {message.message !== null
    && (
      <div className="message">
        {message.status
          ? <div className="error" id="error">{message.message}</div>
          : <div className="success" id="success">{message.message}</div>}
      </div>
    )}
  </div>
)

Message.displayName = 'Message'

Message.propTypes = {
  message: PropTypes.shape({
    message: PropTypes.string,
    status: PropTypes.bool,
  }).isRequired,
}

export default Message
