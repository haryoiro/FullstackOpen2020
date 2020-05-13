import React,{ useEffect, useState } from 'react'
import axios from 'axios'

import Languages from './Languages'
import Weather from './Weather'

const WHTHER_API = process.env.REACT_APP_API_KEY


const CountryDetail = ({ name, capital, population, languages, flag }) => {
  const [weather, setWeather] = useState({})

  useEffect(() => {
    let unmounted = false
    let source = axios.CancelToken.source()
    axios
      .get(`http://api.weatherstack.com/current?access_key=${WHTHER_API}&query=${capital}`)
      .then(res => setWeather(res.data.current))
      .catch(err => {
        if (!unmounted) {
          if (axios.isCancel(err))
            console.log(`request cancelled:${err.message}`)
          else
            console.log("another erro happened:")
        }
      })
    return () => {
      unmounted = true;
      source.cancel("Cancelling in cleanup")
    }
  }, [])

  return (
    <div>
      <h1>{name}</h1>
      <div>capital {capital}</div>
      <div>population {population}</div>
      <Languages languages={languages}/>
      <img src={flag} width={200} alt="flag"/>
      <Weather weather={weather} capital={capital} />
    </div>
  )
}

export default CountryDetail