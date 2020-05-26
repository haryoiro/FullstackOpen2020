const logger = require('./logger')

const requestLogger = (req, res, next) => {
  logger.info('========================')
  logger.succ('Method:', req.method)
  logger.succ('Path:', req.path)
  logger.succ('Body:', req.body)
  logger.info('========================')
  next()
}

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (err, req, res, next) => {
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    return res.status(400).send({ error: 'malformatted id' })
  }
  if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message })
  }
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({ error: 'invalid token' })
  }

  logger.error(err.message)
  return next(err)
}

const tokenMiddleware = (req, res, next) => {
  const auth = req.get('authorization')

  if (auth && auth.toLowerCase().startsWith('bearer ')) {
    req.token = auth.substring(7)
  }
  next()
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenMiddleware,
}
