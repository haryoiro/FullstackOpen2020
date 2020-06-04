import React from 'react'
import PropTypes from 'prop-types'

const LoggedIn = ({ handleLogout, username: { username } }) => (
  <div>
    <div>
      {username.toUpperCase()}
      {' LOGGED IN'}
    </div>
    <button type="submit" onClick={handleLogout}>LOGOUT</button>
  </div>
)

LoggedIn.displayname = 'LoggedIn'

LoggedIn.propTypes = {
  handleLogout: PropTypes.func.isRequired,
  username: PropTypes.shape({
    username: PropTypes.string.isRequired,
  }).isRequired,
}

export default LoggedIn
