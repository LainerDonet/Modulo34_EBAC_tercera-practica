import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import Header from './components/Header';
import Search from './components/Search';
import SearchResult from './components/SearchResult';
import Footer from './components/Footer';
import Card from './components/Card';
import CityPage from './components/CityPage'; // <-- IMPORTADO
import { fetchCitiesWeather, searchCityWeather } from './redux/weatherSlice';
import { API_CONFIG } from './utils/constants';
import { CITIES_INFO } from './data/citiesInfo'; // <-- IMPORTADO

// Estilos globales
const GlobalStyle = createGlobalStyle`

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
      }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    color: #333;
  }

  html {
    scroll-behavior: smooth;
  }
`;

// Theme
const theme = {
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
  breakpoints: {
    mobile: '768px',
    tablet: '1024px',
    desktop: '1200px'
  },
  shadows: {
    small: '0 4px 6px rgba(0, 0, 0, 0.1)',
    medium: '0 10px 25px rgba(0, 0, 0, 0.15)',
    large: '0 20px 40px rgba(0, 0, 0, 0.2)'
  }
};

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MainContainer = styled.main`
  flex: 1;
  padding: 2rem;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 1rem;
  }
`;

const CitiesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
  margin-top: 2rem;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4rem;
`;

const LoadingSpinner = styled.div`
  width: 60px;
  height: 60px;
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid ${props => props.theme.colors.white};
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const ErrorMessage = styled.div`
  background: ${props => props.theme.colors.error};
  color: ${props => props.theme.colors.white};
  padding: 1rem 2rem;
  border-radius: 12px;
  text-align: center;
  margin: 2rem auto;
  max-width: 600px;
  box-shadow: ${props => props.theme.shadows.medium};
`;

const HomePage = () => {
  const dispatch = useDispatch();
  const { citiesData, loading, error } = useSelector((state) => state.weather);

  useEffect(() => {
    dispatch(fetchCitiesWeather());
  }, [dispatch]);

  const handleSearch = (cityName) => {
    dispatch(searchCityWeather(cityName));
  };

  return (
    <>
      <Search onSearch={handleSearch} loading={loading} />
      
      {error && <ErrorMessage>{error}</ErrorMessage>}
      
      <SearchResult />
      
      {loading && Object.keys(citiesData).length === 0 ? (
        <LoadingContainer>
          <LoadingSpinner />
        </LoadingContainer>
      ) : (
        <CitiesGrid>
          {API_CONFIG.DEFAULT_CITIES.map((city) => (
            <Card 
              key={city}
              cityData={citiesData[city]}
              cityName={city}
              cityId={CITIES_INFO[city]?.id} // <-- PROP AÑADIDA
            />
          ))}
        </CitiesGrid>
      )}
    </>
  );
};

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <AppContainer>
        <Header />
        <MainContainer>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<HomePage />} />
            <Route path="/city/:cityId" element={<CityPage />} /> {/* <-- RUTA AÑADIDA */}
          </Routes>
        </MainContainer>
        <Footer />
      </AppContainer>
    </ThemeProvider>
  );
};

export default App;