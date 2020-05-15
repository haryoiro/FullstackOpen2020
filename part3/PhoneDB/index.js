const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const PASSWORD = process.argv[2]
const uri = `mongodb://haryoiroad:${PASSWORD}@cluster0-shard-00-00-xukjb.mongodb.net:27017,cluster0-shard-00-01-xukjb.mongodb.net:27017,cluster0-shard-00-02-xukjb.mongodb.net:27017/phone?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority`

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'mongo connection error ctrl + c'));
db.once('open', () => {
  console.log('try to connect DB')
})

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length >= 5) {
  const name = process.argv[3].toString()
  const number = process.argv[4]
  const person = new Person({
    name: name,
    number: number
  })
  person
    .save()
    .then(res => {
      console.log(`added ${name} number ${number} to phonebook`)
      Person
        .find({})
        .then(result => {
          result.forEach(person => {
            console.log(person)
          })

        mongoose.connection.close()
      })
    }).catch(err => {
      console.log(err)
    })
}