import { useState } from 'react'
import { City, SearchCityProps } from '../common/types'
import { fetchCity } from '../common/api'

const SearchCity = (props: SearchCityProps) => {
  const [foundCities, setFoundCities] = useState<City[]>([])
  const [searchText, setSearchText] = useState('')

  const handleSearch = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault()
    if (!searchText) {
      return
    }
    const cities = await fetchCity(searchText)
    setFoundCities([...cities])
  }

  const handleSelectCity = (city: City) => {
    props.setSelectedCity(city)
    setFoundCities([])
    setSearchText('')
  }

  const renderFoundCities = () => {
    if (foundCities.length === 0) {
      return null
    }
    return (
      <table>
        <tbody>
          {foundCities.map((city, index) => (
            <tr
              key={index}
              onClick={handleSelectCity.bind(null, city)}
              style={{ cursor: 'pointer' }}
            >
              <td>{city.name}</td>
              <td> {city.country} </td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }

  return (
    <div className='search-city'>
      <div>
        <label htmlFor='search-city'>Search City:</label>
        <input
          id='search-city'
          name='search-city'
          type='text'
          placeholder='Search City By Name'
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button onClick={handleSearch}>Go</button>
      </div>
      <div>{renderFoundCities()}</div>
    </div>
  )
}

export default SearchCity
