const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

require('express-async-errors')

const app = express()

const { MONGODB_URI, MONGODB_CONFIG } = require('./utils/config')
const { info } = require('./utils/logger')
const {
  requestLogger,
  unknownEndpoint,
  errorHandler,
} = require('./utils/middleware')

info(`connecting to ${MONGODB_URI}`)

mongoose
  .connect(MONGODB_URI, MONGODB_CONFIG)
  .then(() => {
    info('Connect to MONGODB')
  })
  .catch((err) => {
    info('error connecting to MongoDB:', err.message)
  })

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(requestLogger)

app.use('/api/blogs', require('./controllers/blogs'))

app.use(unknownEndpoint)
app.use(errorHandler)

module.exports = app
