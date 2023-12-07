import { useEffect, useState } from 'react'
import axios from 'axios'
import Weather from '../components/Weather'

const CountryInfo = ({result}) => {
    const keys = Object.keys(result.languages)
    const[weather, setWeather] = useState([])

    useEffect(() => {
        const api_key = import.meta.env.VITE_SOME_KEY
        axios
          .get(`https://api.openweathermap.org/data/2.5/weather?q=${result.capital[0]}&appid=${api_key}`)
          .then(response => {
            console.log(response.data)
            setWeather(response.data)
          })
          .catch((error) => {
            console.error("Error fetching weather data:", error);
          });
      }, [result.capital]);


    return(
      <div>
        <div>
            <h1>{result.name.common}</h1>
            <p>Capital: {result.capital}</p>
            <p>Area: {result.area}</p>
            <h3>Languages:</h3>
            <ul>
              {keys.map((key, index) => 
              <li key={index}> {result.languages[key]}</li>)}
              </ul>

            <img src={result.flags.png} alt='flag' height='200' width='250' /> 
        </div>
        <Weather result={result}/>
      </div>
    )
  }

  export default CountryInfo
