import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { configureStore } from '@reduxjs/toolkit';
import CityPage from '../components/CityPage';
import weatherReducer from '../redux/weatherSlice';

const mockTheme = {
  colors: {
    primary: '#667eea',
    secondary: '#764ba2',
    accent: '#f093fb',
    white: '#ffffff',
    gray: '#6b7280',
    dark: '#1f2937',
    error: '#ef4444',
    success: '#10b981'
  },
  shadows: {
    small: '0 4px 6px rgba(0, 0, 0, 0.1)',
    medium: '0 10px 25px rgba(0, 0, 0, 0.15)',
    large: '0 20px 40px rgba(0, 0, 0, 0.2)'
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

const renderWithProviders = (component, { route = '/', initialState = {} } = {}) => {
  const store = createMockStore(initialState);
  
  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[route]}>
        <ThemeProvider theme={mockTheme}>
          {component}
        </ThemeProvider>
      </MemoryRouter>
    </Provider>
  );
};

describe('CityPage Component', () => {
  test('renders city page for Mexico City', async () => {
    renderWithProviders(<CityPage />, { route: '/city/mexico-city' });
    
    await waitFor(() => {
      expect(screen.getByText('Ciudad de México')).toBeInTheDocument();
    });
    
    expect(screen.getByText('México')).toBeInTheDocument();
  });

  test('shows back button to home', async () => {
    renderWithProviders(<CityPage />, { route: '/city/london' });
    
    const backButton = screen.getByText('← Volver al inicio');
    expect(backButton).toBeInTheDocument();
    expect(backButton.closest('a')).toHaveAttribute('href', '/');
  });

  test('displays city attractions and facts', async () => {
    renderWithProviders(<CityPage />, { route: '/city/madrid' });
    
    await waitFor(() => {
      expect(screen.getByText('Madrid')).toBeInTheDocument();
    });
    
    expect(screen.getByText('Principales Atracciones')).toBeInTheDocument();
    expect(screen.getByText('Datos Curiosos')).toBeInTheDocument();
  });

  test('handles invalid city id', () => {
    renderWithProviders(<CityPage />, { route: '/city/invalid-city' });
    
    expect(screen.getByText('Ciudad no encontrada')).toBeInTheDocument();
  });

  test('shows weather data when available', async () => {
    const mockWeatherData = {
      weather: {
        name: 'London',
        main: { temp: 15, feels_like: 17, humidity: 80, pressure: 1013 },
        weather: [{ description: 'nublado' }],
        wind: { speed: 5 }
      }
    };

    renderWithProviders(
      <CityPage />, 
      { 
        route: '/city/london',
        initialState: { searchResult: mockWeatherData }
      }
    );
    
    await waitFor(() => {
      expect(screen.getByText('Clima Actual')).toBeInTheDocument();
    });
  });
});