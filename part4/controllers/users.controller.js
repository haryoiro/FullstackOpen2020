/* eslint-disable no-param-reassign, no-underscore-dangle */
const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../model/user.model')

usersRouter.get('/', async (req, res) => {
  const users = await User
    .find({}).populate('blogs')
  res.json(users.map((user) => user.toJSON()))
})

usersRouter.post('/', async (req, res) => {
  const { body } = req

  if (!body.username || !body.password) {
    res.status(400).json({ message: 'invalid password or username length.\nrequire longer than 3 length of characters.', error: true }).end()
  }

  const salt = 10
  const passwordHash = await bcrypt.hash(body.password, salt)

  const newUser = await new User({
    username: body.username,
    name: body.name,
    passwordHash,
    blogs: [],
  })

  const savedUser = await newUser.save()

  res.json(savedUser)
})

usersRouter.get('/:id', async (req, res) => {
  const userId = req.params.id
  // ユーザIDが入力されていなければエラー
  if (!userId) {
    return res.status(400).json({ message: 'invalid ID', error: true }).end()
  }

  const result = await User.findById(userId)
  // IDがDB上になければエラー
  if (!result) {
    return res
      .status(404)
      .json({ message: `${userId} is not found` })
      .end()
  }

  return res.json(result.toJSON())
})

module.exports = usersRouter
