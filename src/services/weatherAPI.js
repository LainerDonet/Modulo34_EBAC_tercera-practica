import { API_CONFIG } from '../utils/constants';

const { API_KEY, BASE_URL } = API_CONFIG;

// Función para manejar respuestas de la API
const handleApiResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.message || 
      `Error ${response.status}: ${response.statusText}`
    );
  }
  return response.json();
};

// Función para construir URL con parámetros
const buildUrl = (endpoint, params = {}) => {
  const url = new URL(`${BASE_URL}/${endpoint}`);
  
  // Parámetros por defecto
  const defaultParams = {
    appid: API_KEY,
    units: 'metric',
    lang: 'es'
  };
  
  // Combinar parámetros
  const allParams = { ...defaultParams, ...params };
  
  Object.entries(allParams).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.append(key, value);
    }
  });
  
  return url.toString();
};

export const weatherAPI = {
  // Obtener clima actual
  getCurrentWeather: async (city) => {
    try {
      const url = buildUrl('weather', { q: city });
      const response = await fetch(url);
      return await handleApiResponse(response);
    } catch (error) {
      console.error('Error fetching current weather:', error);
      throw new Error(`No se pudo obtener el clima actual para "${city}": ${error.message}`);
    }
  },

  // Obtener pronóstico de 5 días
  getForecast: async (city) => {
    try {
      const url = buildUrl('forecast', { q: city });
      const response = await fetch(url);
      return await handleApiResponse(response);
    } catch (error) {
      console.error('Error fetching forecast:', error);
      throw new Error(`No se pudo obtener el pronóstico para "${city}": ${error.message}`);
    }
  },

  // Obtener clima por coordenadas
  getWeatherByCoords: async (lat, lon) => {
    try {
      const url = buildUrl('weather', { lat, lon });
      const response = await fetch(url);
      return await handleApiResponse(response);
    } catch (error) {
      console.error('Error fetching weather by coordinates:', error);
      throw new Error(`No se pudo obtener el clima para las coordenadas [${lat}, ${lon}]: ${error.message}`);
    }
  },

  // Obtener pronóstico por coordenadas
  getForecastByCoords: async (lat, lon) => {
    try {
      const url = buildUrl('forecast', { lat, lon });
      const response = await fetch(url);
      return await handleApiResponse(response);
    } catch (error) {
      console.error('Error fetching forecast by coordinates:', error);
      throw new Error(`No se pudo obtener el pronóstico para las coordenadas [${lat}, ${lon}]: ${error.message}`);
    }
  }
};

// Utilidades adicionales para la API
export const weatherUtils = {
  // Convertir velocidad del viento de m/s a km/h
  convertWindSpeed: (speedMs) => Math.round(speedMs * 3.6),
  
  // Formatear temperatura
  formatTemperature: (temp) => `${Math.round(temp)}°C`,
  
  // Obtener icono del clima
  getWeatherIcon: (iconCode) => {
    const iconMap = {
      '01d': '☀️', '01n': '🌙',
      '02d': '⛅', '02n': '☁️',
      '03d': '☁️', '03n': '☁️',
      '04d': '☁️', '04n': '☁️',
      '09d': '🌧️', '09n': '🌧️',
      '10d': '🌦️', '10n': '🌧️',
      '11d': '⛈️', '11n': '⛈️',
      '13d': '❄️', '13n': '❄️',
      '50d': '🌫️', '50n': '🌫️'
    };
    return iconMap[iconCode] || '🌤️';
  },
  
  // Formatear presión atmosférica
  formatPressure: (pressure) => `${pressure} hPa`,
  
  // Formatear humedad
  formatHumidity: (humidity) => `${humidity}%`,
};