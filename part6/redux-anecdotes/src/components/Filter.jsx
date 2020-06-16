import { filterByWord } from '../actions/index'

import React from 'react'
import { connect } from 'react-redux'

const Filter = (props) => {
  const style = {
    marginBottom: 10,
  }

  return (
    <div style={style}>
      filter <input onChange={(e) => props.filterByWord(e.target.value)} />
    </div>
  )
}

export default connect(
  null,
  { filterByWord }
)(Filter)