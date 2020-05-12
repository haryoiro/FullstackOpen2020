import React from 'react'

const culcTotal = (sum, parts) => sum + parts.exercises

const Total = ({ parts }) => {
  return (
    <p>
      Number of {parts.reduce(culcTotal, 0)} exercises
    </p>
  )
}

export default Total