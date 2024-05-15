export type LoginProps = {
  loginStatus: { loggedIn: boolean };
  setLoginStatus: (value: { loggedIn: boolean }) => void;
};

export type City = {
  id: number;
  name: string;
  country: string;
  region: string;
  latitude: number;
  longitude: number;
  population: number;
};

export type SearchCityProps = {
  setSelectedCity: (value: City) => void;
};

export type GetCityWeatherProps = {
  city: City | null;
};

export type Weather = {
  coord: {
    lon: number;
    lat: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
};

export type LoginContextType = {
  loggedIn: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  accessToken: string;
  setAccessToken: React.Dispatch<React.SetStateAction<string>>;
  refreshToken: string;
  setRefreshToken: React.Dispatch<React.SetStateAction<string>>;
};

export type LoginContextProviderProps = {
  children: React.ReactNode;
};
