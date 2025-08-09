import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// Se crea un componente Link con estilos para que no altere el diseño de la tarjeta.
const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;

  &:focus, &:hover, &:visited, &:link, &:active {
    text-decoration: none;
    color: inherit;
  }
`;

const CardContainer = styled.div`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: ${props => props.theme.shadows.medium};
  transition: all 0.3s ease;
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  height: 100%; // Asegura que todas las tarjetas tengan la misma altura en el grid

  &:hover {
    transform: translateY(-8px);
    box-shadow: ${props => props.theme.shadows.large};
  }
`;

const CityName = styled.h3`
  color: ${props => props.theme.colors.dark};
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  text-align: center;
`;

const WeatherIcon = styled.div`
  text-align: center;
  font-size: 4rem;
  margin-bottom: 1rem;
`;

const Temperature = styled.div`
  font-size: 3.5rem;
  font-weight: 700;
  color: ${props => props.theme.colors.primary};
  text-align: center;
  margin-bottom: 0.5rem;
`;

const WeatherDescription = styled.p`
  text-align: center;
  color: ${props => props.theme.colors.gray};
  font-size: 1.1rem;
  margin-bottom: 2rem;
  text-transform: capitalize;
  font-weight: 500;
`;

const WeatherDetails = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;

const DetailItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  background: linear-gradient(145deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
  border-radius: 12px;
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(145deg, rgba(102, 126, 234, 0.2), rgba(118, 75, 162, 0.2));
  }
`;

const DetailLabel = styled.span`
  font-size: 0.85rem;
  color: ${props => props.theme.colors.gray};
  margin-bottom: 0.5rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const DetailValue = styled.span`
  font-size: 1.3rem;
  font-weight: 700;
  color: ${props => props.theme.colors.dark};
`;

const ErrorCard = styled(CardContainer)`
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
`;

const ErrorText = styled.p`
  color: ${props => props.theme.colors.error};
  text-align: center;
  font-weight: 500;
`;

const getWeatherIcon = (weatherCode) => {
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
  return iconMap[weatherCode] || '🌤️';
};

const Card = ({ cityData, cityName, cityId }) => { // Se recibe el prop cityId
  if (!cityData || cityData.error || !cityData.weather) {
    return (
      <ErrorCard>
        <CityName>{cityName}</CityName>
        <ErrorText>
          {cityData?.error || 'Error al cargar datos del clima'}
        </ErrorText>
      </ErrorCard>
    );
  }

  const { weather } = cityData;
  const weatherIcon = getWeatherIcon(weather.weather[0].icon);

  // El contenido de la tarjeta ahora se guarda en una constante
  const cardContent = (
    <CardContainer>
      <CityName>{weather.name}, {weather.sys.country}</CityName>
      <WeatherIcon>{weatherIcon}</WeatherIcon>
      <Temperature>{Math.round(weather.main.temp)}°C</Temperature>
      <WeatherDescription>{weather.weather[0].description}</WeatherDescription>
      
      <WeatherDetails>
        <DetailItem>
          <DetailLabel>Sensación</DetailLabel>
          <DetailValue>{Math.round(weather.main.feels_like)}°C</DetailValue>
        </DetailItem>
        
        <DetailItem>
          <DetailLabel>Humedad</DetailLabel>
          <DetailValue>{weather.main.humidity}%</DetailValue>
        </DetailItem>
        
        <DetailItem>
          <DetailLabel>Viento</DetailLabel>
          <DetailValue>{Math.round(weather.wind?.speed * 3.6 || 0)} km/h</DetailValue>
        </DetailItem>
        
        <DetailItem>
          <DetailLabel>Presión</DetailLabel>
          <DetailValue>{weather.main.pressure} hPa</DetailValue>
        </DetailItem>
      </WeatherDetails>
    </CardContainer>
  );
  
  // Si la tarjeta tiene un cityId, se envuelve en el componente Link
  if (cityId) {
    return (
      <StyledLink to={`/city/${cityId}`}>
        {cardContent}
      </StyledLink>
    );
  }

  // De lo contrario, se renderiza sin enlace (para resultados de búsqueda, por ejemplo)
  return cardContent;
};

export default Card;