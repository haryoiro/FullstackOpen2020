const blogsRouter = require('express').Router()
const Blog = require('../model/blog')

blogsRouter.get('/', (req, res, next) => {
  Blog.find({})
    .then((blogs) => {
      res.json(blogs)
    })
    .catch((err) => next(err))
})

blogsRouter.post('/', (req, res, next) => {
  const { body } = req

  if (body.content === undefined) {
    res.status(400).json({ error: 'content missing' })
  }

  const blog = new Blog(...body)

  blog
    .save()
    .then((result) => {
      res.status(201).json(result)
    })
    .catch((err) => next(err))
})

module.exports = blogsRouter
