// ES5 require
const http = require('http')

// ES6 import/export
// import http from 'http'

const notes = require('./data')

const app = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify(notes))
})

const PORT = 3001;
app.listen(PORT)
console.log(`Server running on port ${PORT}`)