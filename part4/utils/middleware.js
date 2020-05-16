const { info, error } = require('./logger')

const requestLogger = (req, res, next) => {
  info('---')
  info('Method:', req.method)
  info('Path  :', req.path)
  info('Body  :', req.body)
  info('---')
  next()
}

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (err, request, response, next) => {
  error(err.message)

  if (err.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  if (err.name === 'ValidationError') {
    return response.status(400).json({ error: err.message })
  }

  return next(err)
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
}
