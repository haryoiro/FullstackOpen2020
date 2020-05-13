import React from 'react'

// Components
import DataInput from './DataInput'

const PersonForm = ({ addPerson, handleChangeName, handleChangeNumber, newName, newNumber }) => {
  return (
    <form onSubmit={addPerson}>
      <DataInput title="name: " onChange={handleChangeName} value={newName}/>
      <DataInput title="number: " onChange={handleChangeNumber} value={newNumber}/>
      <div> <button type="submit">add</button> </div>
    </form>
  )
}

export default PersonForm