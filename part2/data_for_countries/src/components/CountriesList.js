import React from 'react'

const CountriesList = ({ filterd, onClick  }) => (
  <div>
    {filterd.map(({ name, numericCode }) => (
      <div key={numericCode}>
        {name}
        <button name={name} onClick={onClick}>show</button>
      </div>
    ))}
  </div>
)

export default CountriesList