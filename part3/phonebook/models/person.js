/* eslint-disable no-param-reassign, no-underscore-dangle */

const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const uri = process.env.MONGODB_URI
const config = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
}

mongoose.connect(uri, config)
  .then(() => {
    console.log('MongoDB connected')
  })
  .catch(() => {
    console.log('MongoDB connection error')
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true,
  },
  number: {
    type: String,
    minlength: 8,
    required: true,
  },
})

personSchema.set('toJSON', {
  transform: (document, ret) => {
    ret.id = ret._id
    delete ret._id
    delete ret.__v
  },
})

personSchema.plugin(uniqueValidator, { message: 'Error, expected {PATH} to be unique.' })
const Person = mongoose.model('Person', personSchema)

const update = { color: 'blue' }
const opts = { runValidators: true }
Person.updateOne({}, update, opts)

module.exports = Person
