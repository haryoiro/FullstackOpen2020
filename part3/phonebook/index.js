require('dotenv').config()
const express = require('express')
const path = require('path')
const fs = require('fs')
const cors = require('cors')
const morgan = require('morgan')
const Person = require('./models/person')

const app = express()

app.use(cors())
app.use(express.static('./build'))
app.use(express.json())

const loggingFormat = '[:date[clf]] :method :url :status :res[content-length] - :response-time ms :body'

morgan.token('body', (req) => JSON.stringify(req.body))
app.use(morgan(loggingFormat))
app.use(morgan(loggingFormat, {
  stream: fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' }),
}))


app.get('/info', (req, res, next) => {
  Person.count({}).exec()
    .then((result) => {
      const date = new Date().toString()
      res.send(`
      <div>Phonebook has info for ${result} people</div>
      <div>${date}</div>
      `).status(200)
    })
    .catch((err) => next(err))
})

app.get('/api/persons', (req, res, next) => {
  Person.find({})
    .then((persons) => {
      res.json(persons.map((person) => person.toJSON()))
    })
    .catch((err) => next(err))
})

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      res.json(person.toJSON())
    })
    .catch((err) => next(err))
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndDelete({ _id: req.params.id })
    .then((deleted) => {
      console.log(deleted)
      res.status(204).end()
    })
    .catch((err) => next(err))
})

app.post('/api/persons', (req, res, next) => {
  const { body } = req

  if (body.name === undefined || body.number === undefined) {
    res.status(400).json({
      error: 'content missing',
    }).end()
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save()
    .then((savedPerson) => {
      res.json(savedPerson.toJSON())
    })
    .catch((err) => next(err))
})

app.put('/api/persons/:id', (req, res, next) => {
  const { body } = req

  const person = {
    name: body.name,
    number: body.number,
  }
  Person.findByIdAndUpdate(req.params.id, person, { new: true })
    .then((updatedPerson) => {
      res.json(updatedPerson.toJSON())
    })
    .catch((err) => next(err))
})


const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.name)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  if (error.name === 'ValidationError') {
    return response.status(400).json(error.errors)
  }

  return next(error)
}

app.use(errorHandler)

const { PORT } = process.env
app.listen(PORT, () => {
  console.log(`Server running on PORT:${PORT}`)
})
