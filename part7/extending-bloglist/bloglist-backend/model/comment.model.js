/* eslint-disable no-param-reassign, no-underscore-dangle */
const uniqueValidator = require('mongoose-unique-validator')
const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
  comment: {
    type: String,
    minlength: 1,
    maxlength: 100,
    require: true,
  },
  date: Date,
  blogs: {
      type: mongoose.Types.ObjectId,
      ref: 'Blog',
    },
})

commentSchema.plugin(uniqueValidator)

commentSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id.toString()
    delete ret._id
    delete ret.__v
  },
})

const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment