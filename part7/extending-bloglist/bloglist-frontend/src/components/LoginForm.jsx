import React from 'react'

import { useField } from '../Hooks/index'
import { userLogin, pushNotification } from '../actions/index'
import { useDispatch } from 'react-redux'

const LoginForm = () => {
  const dispatch = useDispatch()
  const password = useField('password')
  const username = useField('username')

  async function handleLogin(event) {
    event.preventDefault()
    try {
      await dispatch(userLogin({
        username: username.props.value,
        password: password.props.value,
      }))
      await dispatch(pushNotification(`LOGIN SUCCESS`))
    } catch(err) {
      await dispatch(pushNotification(`valid username or password`))
    }
    password.onClear()
    username.onClear()
  }

  return (
    <form onSubmit={handleLogin} id="loginForm">
      <div>USERNAME</div>
      <input {...username.props} id="username" />
      <div>PASSWORD</div>
      <input {...password.props} id="password" />
      <button type="submit" id="loginsubmitbutton">LOGIN</button>
    </form>
  )
}

LoginForm.displayName = 'LoginForm'

export default LoginForm
