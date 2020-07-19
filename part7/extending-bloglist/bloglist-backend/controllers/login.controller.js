/* eslint-disable no-param-reassign, no-underscore-dangle */
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../model/user.model')

const { SECRET } = process.env

loginRouter.post('/', async (req, res) => {
  const { body } = req

  const user = await User.findOne({ username: body.username })
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(body.password, user.passwordHash)

  if (!user || !passwordCorrect) {
    return res.status(401).json({
      message: 'invalid username or password',
      error: true,
    })
  }
  // console.log(passwordCorrect)

  const userForToken = {
    username: user.username,
    id: user._id,
  }

  const token = await jwt.sign(userForToken, SECRET)

  return res
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter
