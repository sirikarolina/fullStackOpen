import { useEffect, useState } from 'react'
import axios from 'axios'

const Weather = ({ result }) => {
    const [weather, setWeather] = useState(null)

    useEffect(() => {
        const api_key = import.meta.env.VITE_SOME_KEY
    
        axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${result.capital[0]}&appid=${api_key}`)
        .then(response => {
            console.log(response.data)
            setWeather(response.data)
        })
        .catch(error => {
            console.error('Error fetching weather data:', error)
        });
    }, [result])

    if (weather === null) 
    return null

    return (
        <div>
        <h2>{`Weather in ${result.capital[0]}`}</h2>
        <p>{`Temperature ${(weather.main.temp - 273.15).toFixed(2)} Celsius`}</p>
        <img alt="Weather icon" src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} />
        <p>{`Wind ${weather.wind.speed} m/s`}</p>
        </div>
    )
}

export default Weather