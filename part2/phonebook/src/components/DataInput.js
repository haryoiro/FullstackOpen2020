import React from 'react'

const DataInput = ({ title, onChange, value }) => {
  return (
    <div>
      {title}<input value={value} onChange={onChange} />
    </div>
  )
}

export default DataInput