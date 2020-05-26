/* eslint-disable no-param-reassign, no-underscore-dangle */
const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../model/blog.model')
const User = require('../model/user.model')

const { SECRET } = process.env

blogsRouter.get('/', async (req, res) => {
  const allBlogs = await Blog.find({}).populate('user', {
    username: 1,
    user: 1,
  })
  res.json(allBlogs)
})

blogsRouter.post('/', async (req, res) => {
  const { body } = req
  const decodedToken = await jwt.verify(req.token, SECRET)

  if (!body.title || !body.url) {
    res.status(400).end()
  }
  if (!decodedToken.id) {
    return res
      .status(401)
      .json({ message: 'token missing or invalid', error: true })
  }

  const user = await User.findById(decodedToken.id)

  const blog = await new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
  })

  const savedBlog = await blog.save()
  user.blogs = await user.blogs.concat(savedBlog._id)

  await user.save()

  return res.json(savedBlog.toJSON())
})

blogsRouter.get('/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id)

  return blog ? res.json(blog.toJSON()) : res.status(404).end()
})

blogsRouter.delete('/:id', async (req, res) => {
  const decodedToken = jwt.verify(req.token, SECRET)
  if (!decodedToken.id) {
    return res
      .status(401)
      .json({ message: 'token missing or invalid', error: true })
  }

  const blogOwner = await Blog.findById(req.params.id)
  if (!blogOwner) {
    return res
      .status(404)
      .json({ message: 'Blog not found', error: true })
      .end()
  }
  if (blogOwner.user.toString() !== decodedToken.id.toString()) {
    return res
      .status(401)
      .json({
        message: 'Login token for posted user is required for delete',
        error: true,
      })
  }

  const message = await Blog.findByIdAndRemove(req.params.id)

  return res.status(204).json({ success: true, data: message }).end()
})

blogsRouter.put('/:id', async (req, res) => {
  const { body } = req

  const blog = { ...body }
  await Blog.findByIdAndUpdate(req.params.id, blog, { new: true })

  res.status(204).end()
})

module.exports = blogsRouter
