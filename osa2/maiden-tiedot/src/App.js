import React, { useState, useEffect  } from 'react'
import axios from 'axios'

const accessKey = 'e4efd2a29e1f75639e0b3b14a13743a0'

const Search = ({inputSearchStr, searchStr}) => {
  return (
    <>
      <label htmlFor="search">find countries</label>
      <input type="text" id="search" onChange={inputSearchStr} value={searchStr}/>
    </>
  )
}

const CountryDetails = ({country, weather, setWeather}) => {
  useEffect(() => {
    axios
      .get(`http://api.weatherstack.com/current?access_key=${accessKey}&query=${country.capital}`)
      .then(response => {
        console.log(response)
         const weatherData = {
          temperature: response.data.current.temperature,
          weatherIcons: response.data.current.weather_icons,
          windSpeed: response.data.current.wind_speed,
          windDir: response.data.current.wind_dir
        }
        let weatherCopy = {...weather}
        weatherCopy = weatherData
        setWeather(weatherCopy)
      })
  }, [])

  const weatherIconImgs = () => weather.weatherIcons.map(iconSrc => <img src={iconSrc} alt={iconSrc}/>)

  return (
    <div id="countryDetails" itemScope itemType="https://schema.org/Country">
      <h1>{country.name}</h1>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h2>languages</h2>
      <ul id="languageList">
        {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
      </ul>
      <img id="flag" src={country.flag} alt={country.name} width="10%"/>
      <h2>Weather in {country.capital}</h2>
      <p><b>temperature: </b>{weather.temperature} Celsius</p>
      {weatherIconImgs()}
      <p><b>wind: </b>{weather.windSpeed} kph direction {weather.windDir}</p>
    </div>
  )
}

const View = ({countries, searchStr, selected, weather, setWeather, onClickShow}) => {
  if (selected === '') {
    if (!!searchStr) {
      const countriesToView = countries.filter(country => country.name.toLowerCase().includes(searchStr))
      if (countriesToView.length > 10) {
        return <p>Too many matches, specify another filter</p>
      } else if (countriesToView.length === 1) {
        return <CountryDetails country={countriesToView[0]} weather={weather} setWeather={setWeather}/>
      } else if (countriesToView.length === 0) {
        return <p>No matches, specify another filter</p>
      } else {
        const rows = () => { 
          return(countriesToView.map(country => {
            return(
              <div key={country.name}>
                <span>{country.name}</span>
                <button data-name={country.name} onClick={onClickShow}>select</button>
              </div>
            )
          }
          )
        )}
        return rows()
      }
    } else {
      return (
        <></>
      )
    }
  } else {
    console.log(`${selected} is selected`)
    const found = countries.find(country => country.name === selected)
    console.log(found)
    return <CountryDetails country={found} weather={weather} setWeather={setWeather}/>
  }
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [searchStr, setSearchStr] = useState('')
  const [selected, setSelected] = useState('')
  const [weather, setWeather] = useState({temperature: undefined, weatherIcons:[], windSpeed: undefined, windDir: undefined})

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleSearch = (value) => {
    setSearchStr(value)
    setSelected('')
    let weatherCopy = {...weather}
    weatherCopy = {temperature: undefined, weatherIcons:[], windSpeed: undefined, windDir: undefined}
    setWeather(weatherCopy)
    console.log(searchStr, selected, weather)
  }

  const inputSearchStr = (event) => handleSearch(event.target.value)

  const onClickShow = (event) => setSelected(event.target.getAttribute('data-name'))

  return (
    <div>
      <Search inputSearchStr={inputSearchStr} searchStr={searchStr}/>
      <View countries={countries} searchStr={searchStr} selected={selected} weather={weather} setWeather={setWeather} onClickShow={onClickShow}/>
    </div>
  )
}

export default App;
