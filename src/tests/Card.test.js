import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import Card from '../components/Card';

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

const mockWeatherData = {
  weather: {
    name: 'Madrid',
    sys: { country: 'ES' },
    main: {
      temp: 22.5,
      feels_like: 24.1,
      humidity: 65,
      pressure: 1013
    },
    weather: [
      {
        description: 'cielo claro',
        icon: '01d'
      }
    ],
    wind: {
      speed: 3.5
    }
  }
};

const renderWithTheme = (component) => {
  return render(
    <ThemeProvider theme={mockTheme}>
      {component}
    </ThemeProvider>
  );
};

describe('Card Component', () => {
  test('renders weather card with correct city name', () => {
    renderWithTheme(
      <Card cityData={mockWeatherData} cityName="Madrid,ES" />
    );
    
    expect(screen.getByText('Madrid, ES')).toBeInTheDocument();
  });

  test('displays temperature correctly', () => {
    renderWithTheme(
      <Card cityData={mockWeatherData} cityName="Madrid,ES" />
    );
    
    expect(screen.getByText('23°C')).toBeInTheDocument(); // Rounded from 22.5
  });

  test('shows weather description', () => {
    renderWithTheme(
      <Card cityData={mockWeatherData} cityName="Madrid,ES" />
    );
    
    expect(screen.getByText('cielo claro')).toBeInTheDocument();
  });

  test('displays weather details correctly', () => {
    renderWithTheme(
      <Card cityData={mockWeatherData} cityName="Madrid,ES" />
    );
    
    expect(screen.getByText('24°C')).toBeInTheDocument(); // Feels like
    expect(screen.getByText('65%')).toBeInTheDocument(); // Humidity
    expect(screen.getByText('13 km/h')).toBeInTheDocument(); // Wind speed
    expect(screen.getByText('1013 hPa')).toBeInTheDocument(); // Pressure
  });

  test('renders error state when no weather data', () => {
    const errorData = { error: 'Ciudad no encontrada' };
    
    renderWithTheme(
      <Card cityData={errorData} cityName="InvalidCity" />
    );
    
    expect(screen.getByText('Ciudad no encontrada')).toBeInTheDocument();
  });

  test('renders default error when no data provided', () => {
    renderWithTheme(
      <Card cityData={null} cityName="TestCity" />
    );
    
    expect(screen.getByText('Error al cargar datos del clima')).toBeInTheDocument();
  });
});