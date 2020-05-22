const http = require('http')

const app = require('./app')
const { PORT } = require('./utils/config')
const logger = require('./utils/logger')

const server = http.createServer(app)

server.listen(PORT, () => {
  logger.info(' ----------------------------------')
  logger.succ(`Server running on PORT: ${PORT}`)
  logger.info('----------------------------------')
})
