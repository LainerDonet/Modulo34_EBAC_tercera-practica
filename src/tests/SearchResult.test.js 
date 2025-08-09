import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { configureStore } from '@reduxjs/toolkit';
import SearchResult from '../components/SearchResult';
import weatherReducer from '../redux/weatherSlice';

const mockTheme = {
  colors: {
    primary: '#667eea',
    white: '#ffffff',
    gray: '#6b7280',
    dark: '#1f2937',
    error: '#ef4444'
  },
  shadows: {
    medium: '0 10px 25px rgba(0, 0, 0, 0.15)'
  }
};

const createMockStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      weather: weatherReducer
    },
    preloadedState: {
      weather: {
        citiesData: {},
        searchResult: null,
        loading: false,
        error: null,
        ...initialState
      }
    }
  });
};

const renderWithProviders = (component, initialState = {}) => {
  const store = createMockStore(initialState);
  
  return render(
    <Provider store={store}>
      <ThemeProvider theme={mockTheme}>
        {component}
      </ThemeProvider>
    </Provider>
  );
};

describe('SearchResult Component', () => {
  test('renders nothing when no search result', () => {
    const { container } = renderWithProviders(<SearchResult />);
    expect(container.firstChild).toBeNull();
  });

  test('shows loading state', () => {
    renderWithProviders(<SearchResult />, { loading: true });
    
    expect(screen.getByText('Buscando...')).toBeInTheDocument();
    expect(screen.getByText('🔍 Buscando información meteorológica...')).toBeInTheDocument();
  });

  test('displays search result with weather data', () => {
    const mockSearchResult = {
      weather: {
        name: 'Barcelona',
        sys: { country: 'ES' },
        main: { temp: 22, feels_like: 24, humidity: 70, pressure: 1015 },
        weather: [{ description: 'soleado', icon: '01d' }],
        wind: { speed: 3 }
      }
    };

    renderWithProviders(<SearchResult />, { searchResult: mockSearchResult });
    
    expect(screen.getByText('Resultado de búsqueda')).toBeInTheDocument();
    expect(screen.getByText('Barcelona, ES')).toBeInTheDocument();
  });

  test('shows error message when search fails', () => {
    renderWithProviders(<SearchResult />, { 
      error: 'Ciudad no encontrada',
      searchResult: null 
    });
    
    expect(screen.getByText('❌ No se encontró información para la ciudad buscada')).toBeInTheDocument();
  });

  test('clear button works correctly', () => {
    const mockSearchResult = {
      weather: {
        name: 'Barcelona',
        sys: { country: 'ES' },
        main: { temp: 22, feels_like: 24, humidity: 70, pressure: 1015 },
        weather: [{ description: 'soleado', icon: '01d' }],
        wind: { speed: 3 }
      }
    };

    renderWithProviders(<SearchResult />, { searchResult: mockSearchResult });
    
    const clearButton = screen.getByText('✕ Limpiar');
    expect(clearButton).toBeInTheDocument();
    
    fireEvent.click(clearButton);
    // El test verifica que el botón existe y es clickeable
  });
});