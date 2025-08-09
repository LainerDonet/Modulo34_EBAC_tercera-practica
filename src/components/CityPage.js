import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { searchCityWeather } from '../redux/weatherSlice';
import { CITIES_INFO } from '../data/citiesInfo';

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 1rem;
  }
`;

const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: ${props => props.theme.colors.white};
  text-decoration: none;
  background: rgba(255, 255, 255, 0.2);
  padding: 0.8rem 1.5rem;
  border-radius: 25px;
  margin-bottom: 2rem;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
  }
`;

const CityHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const CityImage = styled.img`
  width: 100%;
  max-width: 600px;
  height: 300px;
  object-fit: cover;
  border-radius: 20px;
  box-shadow: ${props => props.theme.shadows.large};
  margin-bottom: 2rem;
`;

const CityTitle = styled.h1`
  color: ${props => props.theme.colors.white};
  font-size: 3rem;
  font-weight: 700;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.5);
  margin-bottom: 1rem;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 2rem;
  }
`;

const CityCountry = styled.h2`
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.5rem;
  font-weight: 400;
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const InfoSection = styled.section`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: ${props => props.theme.shadows.medium};
`;

const SectionTitle = styled.h3`
  color: ${props => props.theme.colors.primary};
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  border-bottom: 2px solid ${props => props.theme.colors.accent};
  padding-bottom: 0.5rem;
`;

const Description = styled.p`
  color: ${props => props.theme.colors.dark};
  line-height: 1.7;
  font-size: 1.1rem;
  margin-bottom: 2rem;
`;

const HighlightsList = styled.ul`
  list-style: none;
  padding: 0;
`;

const HighlightItem = styled.li`
  color: ${props => props.theme.colors.dark};
  padding: 0.8rem 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  position: relative;
  padding-left: 2rem;

  &:before {
    content: '🌟';
    position: absolute;
    left: 0;
    top: 0.8rem;
  }

  &:last-child {
    border-bottom: none;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-top: 2rem;
`;

const StatItem = styled.div`
  background: linear-gradient(145deg, rgba(102, 126, 234, 0.1), rgba(240, 147, 251, 0.1));
  padding: 1.5rem;
  border-radius: 15px;
  text-align: center;
`;

const StatLabel = styled.div`
  color: ${props => props.theme.colors.gray};
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

const StatValue = styled.div`
  color: ${props => props.theme.colors.dark};
  font-size: 1.2rem;
  font-weight: 700;
`;

const FactsList = styled.div`
  display: grid;
  gap: 1rem;
  margin-top: 1.5rem;
`;

const FactItem = styled.div`
  background: linear-gradient(145deg, rgba(240, 147, 251, 0.1), rgba(102, 126, 234, 0.1));
  padding: 1rem 1.5rem;
  border-radius: 12px;
  border-left: 4px solid ${props => props.theme.colors.accent};
  color: ${props => props.theme.colors.dark};
  font-size: 1rem;
  line-height: 1.5;
`;

const WeatherSection = styled.section`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: ${props => props.theme.shadows.medium};
  margin-top: 2rem;
  grid-column: 1 / -1;
`;

const CityPage = () => {
  const { cityId } = useParams();
  const dispatch = useDispatch();
  const { searchResult, loading } = useSelector((state) => state.weather);

  const cityInfo = Object.values(CITIES_INFO).find(city => city.id === cityId);

  useEffect(() => {
    if (cityInfo) {
      const cityQuery = `${cityInfo.name},${cityInfo.country === 'México' ? 'MX' : 
                         cityInfo.country === 'Cuba' ? 'CU' :
                         cityInfo.country === 'Estados Unidos' ? 'US' :
                         cityInfo.country === 'Canadá' ? 'CA' :
                         cityInfo.country === 'España' ? 'ES' :
                         cityInfo.country === 'Reino Unido' ? 'GB' :
                         cityInfo.country === 'China' ? 'CN' :
                         cityInfo.country === 'Australia' ? 'AU' : ''}`;
      dispatch(searchCityWeather(cityQuery));
    }
  }, [cityId, cityInfo, dispatch]);

  if (!cityInfo) {
    return (
      <PageContainer>
        <BackButton to="/">← Volver al inicio</BackButton>
        <InfoSection>
          <SectionTitle>Ciudad no encontrada</SectionTitle>
          <Description>Lo sentimos, no pudimos encontrar información sobre esta ciudad.</Description>
        </InfoSection>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <BackButton to="/">← Volver al inicio</BackButton>
      
      <CityHeader>
        <CityImage src={cityInfo.image} alt={`Vista panorámica de ${cityInfo.name}`} />
        <CityTitle>{cityInfo.name}</CityTitle>
        <CityCountry>{cityInfo.country}</CityCountry>
      </CityHeader>

      <ContentGrid>
        <InfoSection>
          <SectionTitle>Acerca de {cityInfo.name}</SectionTitle>
          <Description>{cityInfo.description}</Description>
          
          <SectionTitle>Principales Atracciones</SectionTitle>
          <HighlightsList>
            {cityInfo.highlights.map((highlight, index) => (
              <HighlightItem key={index}>{highlight}</HighlightItem>
            ))}
          </HighlightsList>
        </InfoSection>

        <InfoSection>
          <SectionTitle>Datos de la Ciudad</SectionTitle>
          <StatsGrid>
            <StatItem>
              <StatLabel>Población</StatLabel>
              <StatValue>{cityInfo.population}</StatValue>
            </StatItem>
            <StatItem>
              <StatLabel>Fundada</StatLabel>
              <StatValue>{cityInfo.founded}</StatValue>
            </StatItem>
            <StatItem>
              <StatLabel>Elevación</StatLabel>
              <StatValue>{cityInfo.elevation}</StatValue>
            </StatItem>
            <StatItem>
              <StatLabel>Zona Horaria</StatLabel>
              <StatValue>{cityInfo.timezone.split('/')[1]}</StatValue>
            </StatItem>
          </StatsGrid>

          <SectionTitle>Datos Curiosos</SectionTitle>
          <FactsList>
            {cityInfo.funFacts.map((fact, index) => (
              <FactItem key={index}>💡 {fact}</FactItem>
            ))}
          </FactsList>
        </InfoSection>
      </ContentGrid>

      {(searchResult || loading) && (
        <WeatherSection>
          <SectionTitle>Clima Actual</SectionTitle>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <div style={{ 
                width: '40px', 
                height: '40px', 
                border: '4px solid #f3f3f3',
                borderTop: '4px solid #667eea',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
                margin: '0 auto'
              }}></div>
              <p style={{ marginTop: '1rem', color: '#6b7280' }}>Cargando información del clima...</p>
            </div>
          ) : searchResult?.weather ? (
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
              gap: '1rem',
              marginTop: '1rem'
            }}>
              <StatItem>
                <StatLabel>Temperatura</StatLabel>
                <StatValue>{Math.round(searchResult.weather.main.temp)}°C</StatValue>
              </StatItem>
              <StatItem>
                <StatLabel>Sensación térmica</StatLabel>
                <StatValue>{Math.round(searchResult.weather.main.feels_like)}°C</StatValue>
              </StatItem>
              <StatItem>
                <StatLabel>Humedad</StatLabel>
                <StatValue>{searchResult.weather.main.humidity}%</StatValue>
              </StatItem>
              <StatItem>
                <StatLabel>Viento</StatLabel>
                <StatValue>{Math.round((searchResult.weather.wind?.speed || 0) * 3.6)} km/h</StatValue>
              </StatItem>
            </div>
          ) : null}
        </WeatherSection>
      )}
    </PageContainer>
  );
};

export default CityPage;