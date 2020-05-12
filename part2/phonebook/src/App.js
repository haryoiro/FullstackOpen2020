import React, { useState } from 'react'

// Components
import Filter from './components/Filter'
import PersonForm from './components/Filter'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id:0 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id:1 },
    { name: 'Dan Abramov', number: '12-43-234345', id:2 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id:3 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterString, setFilterString] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length
    }
    persons.filter(person => (newPerson.name === person.name) && (newPerson.number === person.number)).length >= 1
      ? alert(`${newName} is already added to phonebook`)
      : setPersons(persons.concat(newPerson))
    setNewName('')
    setNewNumber('')
  }

  const handleChangeName = (event) => {
    setNewName(event.target.value)
  }
  const handleChangeNumber = (event) => {
    setNewNumber(event.target.value)
  }
  const handleNameFilter = (event) => {
    setFilterString(event.target.value)
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        title="filter shown with"
        onChange={handleNameFilter}
        value={filterString} />

      <h3>add a new</h3>
      <PersonForm
        addPerson={addPerson}
        handleChangeName={handleChangeName}
        handleChangeNumber={handleChangeNumber}
        newName={newName}
        newNumber={newNumber} />

      <h3>Numbers</h3>
      <Persons persons={persons} filterString={filterString}/>
    </div>

  )
}

export default App