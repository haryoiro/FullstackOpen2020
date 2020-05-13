import React from 'react'

import {regExpEscape} from '../util/regExpHelper'

const Persons = ({ persons, filterString, onClick }) => {
  return (
    <div>
      {persons
        .filter(x => x.name.match(new RegExp(regExpEscape(filterString))))
        .map(person => {
          const { id, name, number } = person
          return (
            <div key={id}>
              {name} {number}
              <button id={id} name={name} onClick={onClick}>delete</button>
            </div>
          )
        }
      )}
    </div>
  )
}

export default Persons