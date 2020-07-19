/* eslint-disable no-param-reassign, no-underscore-dangle */
const uniqueValidator = require('mongoose-unique-validator')
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    minlength: 3,
    unique: true,
    require: true,
  },
  name: {
    type: String,
    minlength: 3,
    require: true,
  },
  passwordHash: {
    type: String,
    minlength: 3,
    require: true,
  },
  blogs: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Blog',
      default: [],
    },
  ],
})

userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id.toString()
    delete ret._id
    delete ret.__v
    delete ret.passwordHash
  },
})

const User = mongoose.model('User', userSchema)

module.exports = User
