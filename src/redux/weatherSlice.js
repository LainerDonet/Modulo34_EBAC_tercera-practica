import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { weatherAPI } from '../services/weatherAPI';
import { API_CONFIG } from '../utils/constants';

// Estado inicial
const initialState = {
  citiesData: {},
  searchResult: null,
  loading: false,
  error: null,
  lastUpdated: null,
};

// Thunks asíncronos
export const fetchCitiesWeather = createAsyncThunk(
  'weather/fetchCitiesWeather',
  async (_, { rejectWithValue }) => {
    try {
      const weatherPromises = API_CONFIG.DEFAULT_CITIES.map(async (city) => {
        try {
          const weather = await weatherAPI.getCurrentWeather(city);
          const forecast = await weatherAPI.getForecast(city);
          return { city, weather, forecast, error: null };
        } catch (error) {
          console.error(`Error loading weather for ${city}:`, error);
          return { city, weather: null, forecast: null, error: error.message };
        }
      });

      const results = await Promise.all(weatherPromises);
      return results;
    } catch (error) {
      return rejectWithValue(error.message || 'Error al cargar datos del clima');
    }
  }
);

export const searchCityWeather = createAsyncThunk(
  'weather/searchCityWeather',
  async (cityName, { rejectWithValue }) => {
    try {
      if (!cityName || !cityName.trim()) {
        throw new Error('Nombre de ciudad requerido');
      }

      const weather = await weatherAPI.getCurrentWeather(cityName);
      const forecast = await weatherAPI.getForecast(cityName);
      
      return { weather, forecast };
    } catch (error) {
      return rejectWithValue(
        error.message || `No se pudo encontrar información para "${cityName}"`
      );
    }
  }
);

// Slice
const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    clearSearchResult: (state) => {
      state.searchResult = null;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch cities weather
      .addCase(fetchCitiesWeather.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCitiesWeather.fulfilled, (state, action) => {
        state.loading = false;
        const citiesMap = {};
        
        action.payload.forEach(({ city, weather, forecast, error }) => {
          citiesMap[city] = { weather, forecast, error };
        });
        
        state.citiesData = citiesMap;
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(fetchCitiesWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Search city weather
      .addCase(searchCityWeather.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchCityWeather.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResult = action.payload;
      })
      .addCase(searchCityWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.searchResult = null;
      });
  },
});

// Action creators
export const { clearSearchResult, clearError, setLoading } = weatherSlice.actions;

// Selectores
export const selectWeatherState = (state) => state.weather;
export const selectCitiesData = (state) => state.weather.citiesData;
export const selectSearchResult = (state) => state.weather.searchResult;
export const selectLoading = (state) => state.weather.loading;
export const selectError = (state) => state.weather.error;

export default weatherSlice.reducer;