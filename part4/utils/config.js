require('dotenv').config()

const { PORT, MONGODB_URI } = process.env

const MONGODB_CONFIG = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
}

module.exports = {
  PORT,
  MONGODB_URI,
  MONGODB_CONFIG,
}
