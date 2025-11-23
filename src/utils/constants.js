export const API_CONFIG = {
  // Open-Meteo no requiere API Key
  GEOCODING_URL: "https://geocoding-api.open-meteo.com/v1/search",
  WEATHER_URL: "https://api.open-meteo.com/v1",
  DEFAULT_CITIES: [
    "Mexico City,MX",
    "Havana,CU",
    "Miami,US",
    "New York,US",
    "Vancouver,CA",
    "Madrid,ES",
    "London,GB",
    "Beijing,CN",
    "Sydney,AU",
  ],
};

// Mapeo de códigos WMO (Open-Meteo) a iconos de OpenWeather (para mantener compatibilidad UI)
export const WMO_CODES = {
  0: "01d", // Clear sky
  1: "02d", // Mainly clear
  2: "03d", // Partly cloudy
  3: "04d", // Overcast
  45: "50d", // Fog
  48: "50d", // Depositing rime fog
  51: "09d", // Drizzle: Light
  53: "09d", // Drizzle: Moderate
  55: "09d", // Drizzle: Dense
  56: "09d", // Freezing Drizzle: Light
  57: "09d", // Freezing Drizzle: Dense
  61: "10d", // Rain: Slight
  63: "10d", // Rain: Moderate
  65: "10d", // Rain: Heavy
  66: "13d", // Freezing Rain: Light
  67: "13d", // Freezing Rain: Heavy
  71: "13d", // Snow fall: Slight
  73: "13d", // Snow fall: Moderate
  75: "13d", // Snow fall: Heavy
  77: "13d", // Snow grains
  80: "09d", // Rain showers: Slight
  81: "09d", // Rain showers: Moderate
  82: "09d", // Rain showers: Violent
  85: "13d", // Snow showers slight
  86: "13d", // Snow showers heavy
  95: "11d", // Thunderstorm: Slight or moderate
  96: "11d", // Thunderstorm with slight hail
  99: "11d", // Thunderstorm with heavy hail
};

export const WEATHER_CONSTANTS = {
  REFRESH_INTERVAL: 300000, // 5 minutos
  MAX_FORECAST_DAYS: 5,
  DEFAULT_UNITS: "metric",
  DEFAULT_LANGUAGE: "es",
};

export const ROUTES = {
  HOME: "/",
  SEARCH: "/search",
  CITY: "/city/:cityId",
};
