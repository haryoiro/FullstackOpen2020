const blogsRouter = require('express').Router()
const Blog = require('../model/blog')


blogsRouter.get('/', (req, res, next) => {
  Blog.find({})
    .then((blogs) => {
      res.json(blogs)
    })
    .catch((err) => next(err))
})

blogsRouter.get('/:id', async (req, res) => {
  const blog = await Blog.findById({ _id: req.params.id })
  res.status(200).json(blog.toJSON())
})

blogsRouter.post('/', async (req, res) => {
  const { body } = req

  if (!body.title || !body.url) {
    res.status(400).end()
  }

  const blog = await new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes === undefined ? 0 : body.liked,
  })

  const savedBlog = await blog.save()
  res.json(savedBlog.toJSON())
})


module.exports = blogsRouter
