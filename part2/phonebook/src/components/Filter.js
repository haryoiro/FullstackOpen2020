import React from 'react'

// Components
import DataInput from './DataInput'

const Filter = ({ title, onChange, value }) => (
  <DataInput tite={title} onChange={onChange} value={value} />
)

export default Filter
