import React, { useState } from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ handleLogin }) => {
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')

  const handleChangeUser = (event) => {
    setUsername(event.target.value)
  }
  const handleChangePassword = (event) => {
    setPassword(event.target.value)
  }
  const userLogin = (event) => {
    event.preventDefault()
    handleLogin({
      username,
      password,
    })
    setUsername('')
    setPassword('')
  }

  return (
    <form onSubmit={userLogin}>
      USERNAME
      <input type="text" value={username} onChange={handleChangeUser} />
      <br />
      PASSWORD
      <input type="text" value={password} onChange={handleChangePassword} />
      <br />
      <input type="submit" value="LOGIN" />
    </form>
  )
}

LoginForm.displayName = 'LoginForm'

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
}

export default LoginForm
