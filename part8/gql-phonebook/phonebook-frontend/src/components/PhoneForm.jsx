import React, { useState } from 'react'
import { useMutation } from '@apollo/client'


import { EDIT_NUMBER, ALL_PERSONS } from '../queries'
import { useEffect } from 'react'

export default function PhoneForm({ setError }) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')

  const [ changeNumber, result ] = useMutation(EDIT_NUMBER)

  function submit(event) {
    event.preventDefault()

    changeNumber({ variables: { name, phone } })

    setName('')
    setPhone('')
  }

  useEffect(() => {
    if (result.data && result.data.editNumber === null) {
      setError('person not found')
    }
  }, [result.data])

  return (
    <div>
      <h2>Change Number</h2>

      <form onSubmit={submit}>
        <div>
          name <input
            valut={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          phone <input 
            value={phone}
            onChange={({ target }) => setPhone(target.value)}
          />
        </div>
        <button type='submit'>Change Number</button>
      </form>
    </div>
  )
}