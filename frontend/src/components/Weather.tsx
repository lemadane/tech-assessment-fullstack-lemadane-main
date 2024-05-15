import { useState } from 'react';
import { City } from '../common/types';
import SearchCity from './SearchCity';
import GetCityWeather from './GetCityWeather';

const Weather = () => {
  const [city, setCity] = useState<City | null>(null);
  return (
    <div>
      <h1>Weather App</h1>
      <div>
        <SearchCity setSelectedCity={setCity} />
      </div>
      <div>
        <GetCityWeather city={city} />
      </div>
    </div>
  );
};

export default Weather;
