import { useEffect, useState } from 'react'
import axios from 'axios'
import Filter from './components/Filter'

const App = () => {
  const[country, setCountry] = useState('')
  const[result, setResult] = useState([])

  useEffect(() => {
      axios
        .get('https://restcountries.com/v3.1/all')
        .then(response => {
          setResult(response.data)
        })
  }, [])
  
  const handleCountryChange = (event) => {
    setCountry(event.target.value)
  }

  return (
    <div>
      <form>
        Find countries <input value={country} onChange={handleCountryChange} />
      </form>
      <div>
        <Filter key={result.id} result={result} country={country} />
      </div>
    </div>
  )
}

export default App;