export const API_CONFIG = {
  API_KEY: 'cf447bbf29815b4c5671525a4d0e5304',
  BASE_URL: 'https://api.openweathermap.org/data/2.5',
  DEFAULT_CITIES: [
    'Mexico City,MX',
    'Havana,CU',
    'Miami,US',
    'New York,US',
    'Vancouver,CA',
    'Madrid,ES',
    'London,GB',
    'Beijing,CN',
    'Sydney,AU'
  ]
};

export const WEATHER_CONSTANTS = {
  REFRESH_INTERVAL: 300000, // 5 minutos
  MAX_FORECAST_DAYS: 5,
  DEFAULT_UNITS: 'metric',
  DEFAULT_LANGUAGE: 'es'
};

export const ROUTES = {
  HOME: '/',
  SEARCH: '/search',
  CITY: '/city/:cityId'
};