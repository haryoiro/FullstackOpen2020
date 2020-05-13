import React, { useState, useEffect } from 'react';
import axios from 'axios'

import Countries from './components/Countries'
import DataInput from './components/DataInput'

const App = () => {
  const [allCountries, setAllCountries] = useState([])
  const [filterString, setFilterString] = useState('')

  useEffect(() => {
    let unmounted = false
    let source = axios.CancelToken.source()
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then(res => {
        setAllCountries(res.data)
      })
      .catch(err => {
        if (!unmounted) {
          if (axios.isCancel(err))
            console.log(`request cancelled:${err.message}`)
          else
            console.log("another erro happened:")
        }
      })
    return () => {
      unmounted = true
      source.cancel("Cancelling in cleanup")
    }
  }, [])

  const handleChangeName = event => {
    setFilterString(event.target.value)
  }
  const handleOnlyShow = event => {
    setFilterString(event.target.name)
  }

  return (
    <div>
      <DataInput
        title="find countries"
        onChange={handleChangeName}
        value={filterString}
      />
      <Countries
        countries={allCountries}
        filterString={filterString}
        onClick={handleOnlyShow}
      />
    </div>
  )
}

export default App;
