import React from 'react'

import {regExpEscape} from '../util/regExpHelper'

const Persons = ({ persons, filterString }) => {
  return (
    <div>
      {persons
        .filter(x => x.name.match(new RegExp(regExpEscape(filterString))))
        .map(person => (
        <div>{person.name} {person.number}</div>
      ))}
    </div>
  )
}

export default Persons