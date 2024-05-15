import axios from 'axios';
import { City, Weather } from './types';

export const fetchCity = async (city: string) => {
  const url = `https://wft-geo-db.p.rapidapi.com/v1/geo/cities`;
  const options = {
    //method: 'GET',
    headers: {
      'X-RapidAPI-Key': '9e94940f6cmsh329f897deea5ffcp1758b1jsnb658e2328186',
      'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
    },
    params: {
      minPopulation: 500000,
      namePrefix: city,
    },
  };
  const response = await axios.get(url, options);
  return response.data.data as City[];
};

export const fetchWeather = async (lat: number, lon: number) => {
  const url = 'https://api.openweathermap.org/data/2.5/weather';
  const options = {
    params: {
      lat,
      lon,
      appid: '6a08f1e9950930e4f55e5dcba677f23f',
      units: 'metric',
    },
  };
  const response = await axios.get(url, options);
  return response.data as Weather;
};

export const login = async (username: string, password: string) => {
  const url = 'http://localhost:3000/api/auth/login';
  const response = await axios.post(url, { username, password });
  return response.data as { accessToken: string; refreshToken: string };
};
