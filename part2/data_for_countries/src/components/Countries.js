import React from 'react'

import {regExpEscape} from '../util/regExpHelper'
import CountryDetail from './CountryDetail'
import CountriesList from './CountriesList'

const Countries = ({ countries, filterString, onClick }) => {

  const filterd = countries.filter(c => c.name.match(new RegExp(regExpEscape(filterString))))

  if (filterd.length > 10) {
    return <div>Too many matches, specify another filter</div>
  }// 一致する国が10以上
  else if (filterd.length === 1){
    return (
      <CountryDetail
        name={filterd[0].name}
        capital={filterd[0].capital}
        population={filterd[0].population}
        languages={filterd[0].languages}
        flag={filterd[0].flag}
      />
    )
  }// 一致する国が一つ
  else {
    return (
      <CountriesList
        filterd={filterd}
        onClick={onClick}
      />
    )
  }// 一致する国が 10 > x > 1
}

export default Countries