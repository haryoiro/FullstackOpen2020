import React from 'react'

const Weather = ({ capital, weather }) => {
  return (
    <>
      <h2>Weather in {capital}</h2>
      <div>temperature: {weather.temperature}</div>
      <img src={weather.weather_icons} alt="weathericon"/>
      <div>wind: {weather.wind_speed} mph direction {weather.wind_dir}</div>
    </>
  )
}

export default Weather