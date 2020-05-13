import React from 'react'

const DataInput = ({ title, onChange, value }) => {
  return (
    <>
      {title}<input value={value || ''} onChange={onChange} />
    </>
  )
}

export default DataInput