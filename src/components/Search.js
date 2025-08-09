import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { searchCityWeather } from '../redux/weatherSlice';

const SearchContainer = styled.div`
  max-width: 700px;
  margin: 0 auto;
  display: flex;
  gap: 1rem;
  align-items: stretch;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 1.2rem 2rem;
  border: none;
  border-radius: 50px;
  background: rgba(255, 255, 255, 0.95);
  font-size: 1.1rem;
  outline: none;
  box-shadow: ${props => props.theme.shadows.small};
  transition: all 0.3s ease;
  border: 2px solid transparent;

  &:focus {
    background: ${props => props.theme.colors.white};
    box-shadow: ${props => props.theme.shadows.medium};
    border-color: ${props => props.theme.colors.accent};
  }

  &::placeholder {
    color: ${props => props.theme.colors.gray};
    font-style: italic;
  }
`;

const SearchButton = styled.button`
  padding: 1.2rem 2.5rem;
  background: linear-gradient(145deg, ${props => props.theme.colors.accent}, ${props => props.theme.colors.primary});
  color: ${props => props.theme.colors.white};
  border: none;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: ${props => props.theme.shadows.small};
  min-width: 140px;

  &:hover:not(:disabled) {
    transform: translateY(-3px);
    box-shadow: ${props => props.theme.shadows.large};
  }

  &:active:not(:disabled) {
    transform: translateY(-1px);
  }

  &:disabled {
    background: ${props => props.theme.colors.gray};
    cursor: not-allowed;
    transform: none;
    opacity: 0.7;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    width: 100%;
  }
`;

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.weather);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      dispatch(searchCityWeather(searchTerm.trim()));
      setSearchTerm('');
    }
  };

  return (
    <SearchContainer>
      <SearchInput
        type="text"
        placeholder="Buscar ciudad (ej: Buenos Aires, Tokyo, Paris...)"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleSubmit(e)}
      />
      <SearchButton 
        onClick={handleSubmit} 
        disabled={loading || !searchTerm.trim()}
      >
        {loading ? '🔍 Buscando...' : '🔍 Buscar'}
      </SearchButton>
    </SearchContainer>
  );
};

export default Search;