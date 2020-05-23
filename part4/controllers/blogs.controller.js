/* eslint-disable no-param-reassign, no-underscore-dangle */
const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../model/blog.model')
const User = require('../model/user.model')

const { SECRET } = process.env
const { getTokenFrom } = require('../utils/authHelper')

blogsRouter.get('/', async (req, res) => {
  const allBlogs = await Blog.find({}).populate('user', {
    username: 1,
    user: 1,
  })
  res.json(allBlogs)
})

blogsRouter.get('/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id)
  if (blog) {
    res.json(blog.toJSON())
  } else {
    res.status(404).end()
  }
})

blogsRouter.post('/', async (req, res) => {
  const { body } = req
  const token = getTokenFrom(req)
  const decodedToken = jwt.verify(token, SECRET)
  if (!token || !decodedToken.id) {
    return res.status(401).json({
      message: 'token missing or invalid',
      error: true,
    })
  }
  const user = await User.findOne(decodedToken.id)

  if (!body.title || !body.url) {
    res.status(400).end()
  }

  const blog = await new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes === undefined ? 0 : body.liked,
    user: user._id,
  })

  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  return res.json(savedBlog.toJSON())
})

blogsRouter.delete('/:id', async (req, res) => {
  const message = await Blog.findByIdAndRemove(req.params.id)
  const err = {
    success: false,
    error: 'Blog not found',
  }
  const suc = {
    success: true,
    data: message,
  }
  if (!message) {
    res.status(404).json(err).end()
  } else {
    res.status(204).json(suc).end()
  }
  // res.json(deleted).status(204).end()
})

blogsRouter.put('/:id', async (req, res) => {
  const { body } = req

  const blog = { ...body }
  await Blog.findByIdAndUpdate(req.params.id, blog, { new: true })

  res.status(204).end()
})

module.exports = blogsRouter
