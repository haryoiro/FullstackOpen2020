import React, { useState, useEffect } from 'react'

// Components
import Notification from './components/Notification'
import Filter       from './components/Filter'
import PersonForm   from './components/PersonForm'
import Persons      from './components/Persons'

// Services
import personsServices from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterString, setFilterString] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    personsServices
      .getAll()
      .then(persons => {
        setPersons(persons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber,
      id: null
    }

    if (persons.filter(p => p.name === newName).length >= 1){
      updatePerson(newPerson)
    }
    else {
      personsServices
        .add(newPerson)
        .then(addedPerson => {
          setPersons(persons.concat(addedPerson))
          setMessage({ message: `Added ${addedPerson.name}`, type: "success" })
          setTimeout(() => {
            setMessage(null)
          }, 3000)
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const deletePerson = event => {
    const id = parseInt(event.target.id, 10)
    const name = event.target.name
    if (window.confirm(`Delete ${name} ?`)) {
      personsServices
        .deleteNumber(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id))
          setMessage({ message: `Deleted ${name}`, type: "success" })
          setTimeout(() => {
            setMessage(null)
          }, 3000)
        })
        .catch(err => {
          console.log(err)
          setMessage({ message: `Information of ${name} has already been removed from server`, type: "failure" })
          setTimeout(() => {
            setMessage(null)
          }, 3000)
        })
    }
  }

  const updatePerson = (newPerson) => {
    if (window.confirm(`${newName}is already added to phonebook, replace the old number with a new one?`))
    {
      const index = persons.findIndex(p => p.name === newName)
      const id = persons[index].id
      personsServices
        .update(id, newPerson)
        .then(updatedPersons => {
          setPersons(persons.map(p => p.id !== id ? p : updatedPersons))
          setMessage({ message: `Updated ${updatedPersons.name}`, type: "success" })
          setTimeout(() => {
            setMessage(null)
          }, 3000)
          setNewName('')
          setNewNumber('')
        })
    }
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
    <div className="container">
      <h1>Phonebook</h1>
      <Notification message={message}/>
      <Filter
        title="filter shown with"
        onChange={handleNameFilter}
        value={filterString} />

      <h2>add a new</h2>
      <PersonForm
        addPerson={addPerson}
        handleChangeName={handleChangeName}
        handleChangeNumber={handleChangeNumber}
        newName={newName}
        newNumber={newNumber} />

      <h2>Numbers</h2>
      <Persons
        persons={persons}
        filterString={filterString}
        onClick={deletePerson}
      />
    </div>
  )
}

export default App