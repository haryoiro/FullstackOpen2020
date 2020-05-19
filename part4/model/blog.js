/* eslint-disable no-param-reassign, no-underscore-dangle */
const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
    minlength: 4,
  },
  author: String,
  url: {
    type: String,
    require: true,
  },
  likes: Number,
})

blogSchema.set('toJSON', {
  transform: (document, ret) => {
    ret.id = ret._id.toString()
    delete ret._id
    delete ret.__v
    return ret
  },
})

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog
