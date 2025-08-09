import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import Card from './Card';
import { clearSearchResult } from '../redux/weatherSlice';

const SearchResultContainer = styled.div`
  max-width: 600px;
  margin: 2rem auto;
  position: relative;
`;

const ResultHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding: 0 1rem;
`;

const ResultTitle = styled.h2`
  color: ${props => props.theme.colors.white};
  font-size: 1.4rem;
  font-weight: 600;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`;

const ClearButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  color: ${props => props.theme.colors.white};
  border: 2px solid rgba(255, 255, 255, 0.3);
  padding: 0.7rem 1.5rem;
  border-radius: 25px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    border-color: rgba(255, 255, 255, 0.5);
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const NoResultMessage = styled.div`
  background: rgba(255, 255, 255, 0.1);
  color: ${props => props.theme.colors.white};
  padding: 2rem;
  border-radius: 15px;
  text-align: center;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const SearchResult = () => {
  const dispatch = useDispatch();
  const { searchResult, loading, error } = useSelector((state) => state.weather);

  const handleClearSearch = () => {
    dispatch(clearSearchResult());
  };

  if (!searchResult && !loading) return null;

  return (
    <SearchResultContainer>
      <ResultHeader>
        <ResultTitle>
          {loading ? 'Buscando...' : 'Resultado de búsqueda'}
        </ResultTitle>
        {(searchResult || error) && (
          <ClearButton onClick={handleClearSearch}>
            ✕ Limpiar
          </ClearButton>
        )}
      </ResultHeader>
      
      {loading ? (
        <NoResultMessage>
          🔍 Buscando información meteorológica...
        </NoResultMessage>
      ) : searchResult ? (
        <Card cityData={searchResult} cityName="Ciudad buscada" />
      ) : error ? (
        <NoResultMessage>
          ❌ No se encontró información para la ciudad buscada
        </NoResultMessage>
      ) : null}
    </SearchResultContainer>
  );
};

export default SearchResult;