import { useEffect, useState } from "react"
import { City, GetCityWeatherProps, Weather } from "../common/types"
import { fetchWeather } from "../common/api"

const GetCityWeather = (props: GetCityWeatherProps) => {
    const[weather, setWeather] = useState<Weather| null>(null)

 useEffect(() => {
    (async () => {
      if (!props.city) {
        return
      }
      const { latitude, longitude } = props.city as City  
      const result = await fetchWeather(latitude, longitude)
      setWeather(result)
    })()
 }, [props.city])

  return (
    <div>
        <h2>Weather</h2>
        <div>
            <h4>City: {props.city?.name}</h4>
            <h4>Temperature: {weather?.main?.temp}°C</h4>
            <h4>Feels Like: {weather?.main?.feels_like}°C</h4>
            <h4>Humidity: {weather?.main?.humidity}%</h4>
            <h4>Pressure: {weather?.main?.pressure}hPa</h4>
            <h4>Wind Speed: {weather?.wind?.speed}m/s</h4>
        </div>
    </div>
  )
}

export default GetCityWeather