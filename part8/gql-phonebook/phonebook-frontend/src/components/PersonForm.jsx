import React, { useState } from 'react'
import { gql, useMutation } from '@apollo/client'

// GraphQLでの変数は $variable ノカタチにする。
// 実行時はuseMutation Hookを使い、変数に値を代入する。
const CREATE_PERSON = gql`
mutation createPerson($name: String!, $street: String!, $city: String, $phone: String) {
  addPerson(
    name: $name,
    street: $street,
    city: $city,
    phone: $phone
  ) {
    name
    phone
    id
    address {
      street
      city
    }
  }
}
`

const ALL_PERSONS = gqb`
  query {
    allPersons {
      name
      phone
      id
    }
  }
`

function PersonForm() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [street, setStreet] = useState('')
  const [city, setCity] = useState('')

  const [ createPerson ] = useMutation(CREATE_PERSON, {
    refetchQueries: [ { query: ALL_PERSONS } ]
  })

  function submit(event) {
    event.preventDefault()

    createPerson({ variables: { name, phone, street, city } })

    setName('')
    setPhone('')
    setStreet('')
    setCity('')
  }

  return (
    <div>
      <h2>CREATE NEW</h2>
      <form onSubmit={submit}>
        <div>
          NAME <input value={name}
            onCharge={({ target }) => setName(target.value)} />
        </div>
        <div>
          PHONE <input value={phone}
            onCharge={({ target }) => setName(target.value)} />
        </div>
        <div>
          STREET <input value={street}
            onCharge={({ target }) => setName(target.value)} />
        </div>
        <div>
          CITY <input value={city}
            onCharge={({ target }) => setName(target.value)} />
        </div>
        <button>ADD</button>
      </form>
    </div>
  )
}

export default PersonForm