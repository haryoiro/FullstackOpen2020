/* eslint-disable no-param-reassign, no-underscore-dangle */
const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: {
    type: Number,
    default: 0,
  },
  comments: [{
    type: mongoose.Types.ObjectId,
    ref: 'Comment',
  }],
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
  },
})

blogSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id.toString()
    delete ret._id
    delete ret.__v
  },
})

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog
