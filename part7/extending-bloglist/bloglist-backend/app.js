const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

require('express-async-errors')

const app = express()

const { MONGODB_URI, MONGODB_CONFIG } = require('./utils/config')
const logger = require('./utils/logger')

const {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenMiddleware,
} = require('./utils/middleware')

logger.info(' ================================================')
logger.acti(`connecting to ${MONGODB_URI}`)
logger.info('================================================\n')

mongoose
  .connect(MONGODB_URI, MONGODB_CONFIG)
  .then(() => {
    logger.info('\n ~~~~~~~~~~~~~~~~~~~~~~~~~~')
    logger.succ('connected to MongoDB')
    logger.info('~~~~~~~~~~~~~~~~~~~~~~~~~~\n\n')
  })
  .catch((err) => {
    logger.erro('error connecting to MongoDB:', err.message)
  })

app.use(cors())
app.use(express.static('./build'))
app.use(express.json())
app.use(requestLogger)
app.use(tokenMiddleware)

app.use('/api/blogs', require('./controllers/blogs.controller'))
app.use('/api/users', require('./controllers/users.controller'))
app.use('/api/login', require('./controllers/login.controller'))

if (process.env.NODE_ENV === 'test') {
  // eslint-disable-next-line global-require
  app.use('/api/testing', require('./controllers/testing.controller'))
}

app.use(unknownEndpoint)
app.use(errorHandler)

module.exports = app
