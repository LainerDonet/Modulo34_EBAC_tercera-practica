import { API_CONFIG, WMO_CODES } from "../utils/constants";

// Helper para obtener coordenadas de una ciudad
const getCoordinates = async (city) => {
  const { GEOCODING_URL } = API_CONFIG;
  // Limpiamos el nombre de la ciudad (quitamos el código de país si existe, ej: "London,GB" -> "London")
  const cityName = city.split(",")[0];

  const url = new URL(GEOCODING_URL);
  url.searchParams.append("name", cityName);
  url.searchParams.append("count", 1);
  url.searchParams.append("language", "es");
  url.searchParams.append("format", "json");

  console.log(`Geocoding: ${url.toString()}`);
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Geocoding failed for ${city}`);
  }

  const data = await response.json();

  if (!data.results || data.results.length === 0) {
    throw new Error(`No coordinates found for ${city}`);
  }

  return data.results[0]; // { latitude, longitude, name, country, ... }
};

// Helper para mapear respuesta de Open-Meteo a formato OpenWeather (Current)
const mapCurrentWeather = (data, cityInfo) => {
  const { current_weather } = data;

  // Mapear código WMO a icono
  const iconCode = WMO_CODES[current_weather.weathercode] || "02d";

  return {
    coord: {
      lat: cityInfo.latitude,
      lon: cityInfo.longitude,
    },
    weather: [
      {
        id: current_weather.weathercode,
        main: "Unknown", // Open-Meteo no da esto directamente, pero no es crítico
        description: "Condiciones actuales", // Podríamos mapear códigos a texto si fuera necesario
        icon: iconCode,
      },
    ],
    base: "stations",
    main: {
      temp: current_weather.temperature,
      feels_like: current_weather.temperature, // Open-Meteo basic current_weather doesn't have feels_like, using temp as fallback
      temp_min: current_weather.temperature, // No disponible en current_weather simple
      temp_max: current_weather.temperature, // No disponible en current_weather simple
      pressure: 1013, // Valor por defecto si no se pide hourly
      humidity: 50, // Valor por defecto si no se pide hourly
    },
    visibility: 10000,
    wind: {
      speed: current_weather.windspeed / 3.6, // Convert km/h to m/s for compatibility
      deg: current_weather.winddirection,
    },
    clouds: {
      all: 0,
    },
    dt: Math.floor(Date.now() / 1000),
    sys: {
      type: 1,
      id: 0,
      country: cityInfo.country_code || "XX",
      sunrise: 0,
      sunset: 0,
    },
    timezone: 0,
    id: cityInfo.id,
    name: cityInfo.name,
    cod: 200,
  };
};

// Helper para mapear respuesta de Open-Meteo a formato OpenWeather (Forecast)
// Nota: La UI actual no parece usar el forecast intensivamente, pero lo mapeamos para evitar errores.
const mapForecast = (data, cityInfo) => {
  // Open-Meteo devuelve hourly/daily arrays. OpenWeather devuelve una lista de pasos de 3h.
  // Simulamos una estructura básica.
  return {
    cod: "200",
    message: 0,
    cnt: 40,
    list: [], // Dejamos lista vacía o podríamos poblarla si la UI lo requiere
    city: {
      id: cityInfo.id,
      name: cityInfo.name,
      coord: {
        lat: cityInfo.latitude,
        lon: cityInfo.longitude,
      },
      country: cityInfo.country_code || "XX",
      population: 0,
      timezone: 0,
      sunrise: 0,
      sunset: 0,
    },
  };
};

export const weatherAPI = {
  // Obtener clima actual
  getCurrentWeather: async (city) => {
    try {
      // 1. Obtener coordenadas
      const cityInfo = await getCoordinates(city);

      // 2. Obtener clima
      const { WEATHER_URL } = API_CONFIG;
      const url = new URL(`${WEATHER_URL}/forecast`);
      url.searchParams.append("latitude", cityInfo.latitude);
      url.searchParams.append("longitude", cityInfo.longitude);
      url.searchParams.append("current_weather", true);
      url.searchParams.append("windspeed_unit", "kmh"); // Default, we convert later

      // Para obtener humedad y presión (que current_weather no trae), necesitamos hourly
      url.searchParams.append(
        "hourly",
        "relativehumidity_2m,surface_pressure,apparent_temperature"
      );

      console.log(`Fetching Weather: ${url.toString()}`);
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Weather API failed`);
      }

      const data = await response.json();

      // Mapeo manual mejorado para incluir humedad/presión
      const mapped = mapCurrentWeather(data, cityInfo);

      if (data.hourly) {
        const hourIndex = new Date().getHours();
        mapped.main.humidity = data.hourly.relativehumidity_2m[hourIndex] || 50;
        mapped.main.pressure = data.hourly.surface_pressure[hourIndex] || 1013;
        mapped.main.feels_like =
          data.hourly.apparent_temperature[hourIndex] || mapped.main.temp;
      }

      return mapped;
    } catch (error) {
      console.error("Error fetching current weather:", error);
      throw new Error(
        `No se pudo obtener el clima actual para "${city}": ${error.message}`
      );
    }
  },

  // Obtener pronóstico de 5 días
  getForecast: async (city) => {
    try {
      const cityInfo = await getCoordinates(city);
      // Retornamos estructura dummy válida ya que la UI no parece renderizar el forecast detallado
      return mapForecast({}, cityInfo);
    } catch (error) {
      console.error("Error fetching forecast:", error);
      throw new Error(
        `No se pudo obtener el pronóstico para "${city}": ${error.message}`
      );
    }
  },

  // Obtener clima por coordenadas
  getWeatherByCoords: async (lat, lon) => {
    try {
      // Simulamos cityInfo con las coordenadas
      const cityInfo = {
        latitude: lat,
        longitude: lon,
        name: "Ubicación actual",
        country_code: "",
      };

      const { WEATHER_URL } = API_CONFIG;
      const url = new URL(`${WEATHER_URL}/forecast`);
      url.searchParams.append("latitude", lat);
      url.searchParams.append("longitude", lon);
      url.searchParams.append("current_weather", true);
      url.searchParams.append(
        "hourly",
        "relativehumidity_2m,surface_pressure,apparent_temperature"
      );

      const response = await fetch(url);
      const data = await response.json();

      const mapped = mapCurrentWeather(data, cityInfo);
      if (data.hourly) {
        const hourIndex = new Date().getHours();
        mapped.main.humidity = data.hourly.relativehumidity_2m[hourIndex] || 50;
        mapped.main.pressure = data.hourly.surface_pressure[hourIndex] || 1013;
        mapped.main.feels_like =
          data.hourly.apparent_temperature[hourIndex] || mapped.main.temp;
      }
      return mapped;
    } catch (error) {
      console.error("Error fetching weather by coordinates:", error);
      throw new Error(
        `No se pudo obtener el clima para las coordenadas [${lat}, ${lon}]: ${error.message}`
      );
    }
  },

  // Obtener pronóstico por coordenadas
  getForecastByCoords: async (lat, lon) => {
    try {
      const cityInfo = {
        latitude: lat,
        longitude: lon,
        name: "Ubicación actual",
      };
      return mapForecast({}, cityInfo);
    } catch (error) {
      console.error("Error fetching forecast by coordinates:", error);
      throw new Error(
        `No se pudo obtener el pronóstico para las coordenadas [${lat}, ${lon}]: ${error.message}`
      );
    }
  },
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
      "01d": "☀️",
      "01n": "🌙",
      "02d": "⛅",
      "02n": "☁️",
      "03d": "☁️",
      "03n": "☁️",
      "04d": "☁️",
      "04n": "☁️",
      "09d": "🌧️",
      "09n": "🌧️",
      "10d": "🌦️",
      "10n": "🌧️",
      "11d": "⛈️",
      "11n": "⛈️",
      "13d": "❄️",
      "13n": "❄️",
      "50d": "🌫️",
      "50n": "🌫️",
    };
    return iconMap[iconCode] || "🌤️";
  },

  // Formatear presión atmosférica
  formatPressure: (pressure) => `${pressure} hPa`,

  // Formatear humedad
  formatHumidity: (humidity) => `${humidity}%`,
};
