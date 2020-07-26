import React, { useState } from 'react'
import { useMutation } from '@apollo/client'

import {
  CREATE_PERSON,
  ALL_PERSONS,
} from '../queries'

function PersonForm({ setError }) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [street, setStreet] = useState('')
  const [city, setCity] = useState('')

  const [createPerson] = useMutation(CREATE_PERSON, {
    // refetchQueries: [{ query: ALL_PERSONS }],
    onError: (error) => {
      setError(error.graphQLErrors[0].message)
    },
    // refetchQueriesでは更新を行うたび常にクエリが再実行されてしまう
    // この欠点を解消するためにupdateにmutationを設定し、実行結果がキャッシュされるようにする。
    update: (store, response) => {
      const dataInStore = store.readQuery({ query: ALL_PERSONS })
      store.writeQuery({
        query: ALL_PERSONS,
        data: {
          ...dataInStore,
          allPersons: [...dataInStore.allPersons, response.data.addPerson],
        }
      })
    }
  })

  function submit(event) {
    event.preventDefault()

    createPerson({
      variables: {
        name,
        phone: phone.length > 0 ? phone : null,
        street,
        city,
      }
    })

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