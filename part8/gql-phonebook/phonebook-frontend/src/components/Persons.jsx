import React, { useState, useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'

import { FIND_PERSON } from '../queries'

function Persons({ persons }) {
  // 遅延読み込み
  // getPersonにクエリを渡して実行するとリクエストが送信され、結果はresultに保管される。
  const [getPerson, result] = useLazyQuery(FIND_PERSON)
  const [person, setPerson] = useState(null)

  function showPerson(name) {
    getPerson({ variables: { nameToSearch: name } })
  }

  useEffect(() => {
    // getPersonの結果が帰るとresultが更新され、この副作用が実行される。
    if (result.data) {
      // 結果はpersonStateに保存する。
      setPerson(result.data.findPerson)
    }
  }, [result])

  if (person) {
    // closeが押されるとpersonがnullになり
    // デフォルトのコンポーネントがレンダリングされる。
    return (
      <div>
        <h2>{person.name}</h2>
        <div>{person.address.street} {person.address.city}</div>
        <div>{person.phone}</div>
        <button onClick={() => setPerson(null)}>CLOSE</button>
      </div>
    )
  }

  // デフォルトのコンポーネント
  // SHOW ADDRESSを押すとshowPerson関数内のgetPersonが実行される。
  return (
    <div>
      <h2>Persons</h2>
      {persons.map(p => 
        <div key={p.name}>
          {p.name} {p.phone}
          <button onClick={() => showPerson(p.name)}>
            SHOW ADDRESS
          </button>
        </div>
      )}
    </div>
  )
}


export default Persons