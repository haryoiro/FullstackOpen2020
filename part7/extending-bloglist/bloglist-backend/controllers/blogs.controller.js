/* eslint-disable no-param-reassign, no-underscore-dangle */
const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../model/blog.model')
const User = require('../model/user.model')
const Comment = require('../model/comment.model')

const { SECRET } = process.env

// Blogをすべて探索
blogsRouter.get('/', async (req, res) => {
  const allBlogs = await Blog
    .find({})
    .populate('user', { username: 1, user: 1 })
    .populate('comments', { comment: 1, data: 1 })
  res.json(allBlogs)
})

// 新たなBlogを作成
// 要トークン
blogsRouter.post('/', async (req, res) => {
  const { body, token } = req
  const { title, url, author, likes } = body
  const decodedToken = await jwt.verify(token, SECRET)

  if (!(title || url)) {
    res.status(400).end()
  }
  if (!decodedToken.id) {
    return res
      .status(401)
      .json({ message: 'token missing or invalid', error: true })
  }

  const user = await User.findById(decodedToken.id)
  const blog = await new Blog({
    title, author, url, likes,
    user: user._id,
  })

  const savedBlog = await blog.save()
  user.blogs = [...user.blogs, savedBlog._id]
  await user.save()
  return res.json(savedBlog.toJSON())
})


blogsRouter.get('/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id)
  return blog
    ? res.json(blog.toJSON())
    : res.status(404).end()
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
      .json({ message: 'Login token for posted user is required for delete', error: true })
  }

  const message = await Blog.findByIdAndRemove(req.params.id)
  return res.status(204).json({ message, error: false }).end()
})


blogsRouter.put('/:id', async (req, res) => {
  const { body } = req
  console.log("body", body)
  const blog = { ...body }
  const message = await Blog.findByIdAndUpdate(req.params.id, blog, { new: true })

  res.status(204).json({ message, error: false }).end()
})


// コメント投稿機能
// api/blogs/:id/comments
blogsRouter.post('/:id/comments', async (req, res) => {
  const { comment } = req.body
  if (!comment) {
    return res
      .status(401)
      .json({ message: 'Comment is valid', error: true})
  }

  const blog = await Blog.findById(req.params.id)
  if (!blog) {
    return res
      .status(404)
      .json({ message: 'Blog not found', error: true })
      .end()
  }

  const newComment = new Comment({
    comment,
    date: new Date(),
    blog: blog._id,
  })

  const savedComment = await newComment.save()
  blog.comments = [...blog.comments, savedComment._id]
  await blog.save()
  return res.json(savedComment.toJSON())
})

module.exports = blogsRouter
