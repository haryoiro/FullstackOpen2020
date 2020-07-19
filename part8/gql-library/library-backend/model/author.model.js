const { Schema, model } = require('mongoose')

const authorSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 4,
  },
  born: {
    type: Number,
  },
})

module.exports = model('Author', authorSchema)
