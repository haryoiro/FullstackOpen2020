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
    <div>
      <p>{ username?.toUpperCase() } <span> LOGGED IN</span></p>
      <button onClick={handleLogout}>LOGOUT</button>
    </div>
  )
}

export default LoggedIn
