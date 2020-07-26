const { Schema, model } = require('mongoose')

const bookSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    minlength: 2,
  },
  published: {
    type: Number,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'Author',
  },
  genres: [
    {
      type: String,
    }
  ]
})

bookSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id.toString()
    delete ret._id
    delete ret.__v
  },
})

module.exports = model('Book', bookSchema)
