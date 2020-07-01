import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { userLogout } from '../actions/index'

const LoggedIn = () => {
  const username = useSelector((n) => n.user)
  const dispatch = useDispatch()

  function handleLogout(event) {
    event.preventDefault()
    dispatch(userLogout())
  }

  return (
    <div className="header-container-loggedin">
      <span className="header-container-loggedin-username">{ username?.toUpperCase() } LOGGED IN</span>
      <button onClick={handleLogout} className="header-container-loggedin-logout">LOGOUT</button>
    </div>
  )
}

export default LoggedIn
