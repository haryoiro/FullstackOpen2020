const { style } = require('./consoleStyleHelper')

const acti = (...params) => {
  if (process.env.NODE_ENV !== 'test') {
    console.log(style.FgBlue, '📘:', ...params, '\x1b[0m')
  }
}

const succ = (...params) => {
  if (process.env.NODE_ENV !== 'test') {
    console.log(style.FgGreen, '📗:', ...params, '\x1b[0m')
  }
}

const info = (...params) => {
  if (process.env.NODE_ENV !== 'test') {
    console.log(style.FgWhite, ...params, '\x1b[0m')
  }
}

const error = (...params) => {
  if (process.env.NODE_ENV !== 'test') {
    console.error(style.FgRed, '📕:', ...params, '\x1b[0m')
  }
}

module.exports = {
  acti,
  succ,
  info,
  error,
}
