// Exportaciones centralizadas de Redux
export { default as store } from './store';
export * from './weatherSlice';

// Re-exportar hooks de React Redux para facilitar imports
export { useSelector, useDispatch } from 'react-redux';

// Selectores personalizados
export const selectWeatherData = (state) => state.weather;
export const selectCitiesData = (state) => state.weather.citiesData;
export const selectSearchResult = (state) => state.weather.searchResult;
export const selectLoading = (state) => state.weather.loading;
export const selectError = (state) => state.weather.error;

// Action creators para uso directo
export { 
  fetchCitiesWeather, 
  searchCityWeather, 
  clearSearchResult, 
  clearError 
} from './weatherSlice';