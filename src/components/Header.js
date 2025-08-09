import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(15px);
  padding: 2rem;
  text-align: center;
  box-shadow: ${props => props.theme.shadows.medium};
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 1.5rem 1rem;
  }
`;

const Title = styled.h1`
  color: ${props => props.theme.colors.white};
  font-size: 3rem;
  font-weight: 700;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.3);
  margin-bottom: 0.8rem;
  letter-spacing: -0.5px;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 2.2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.8rem;
  }
`;

const Subtitle = styled.p`
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.2rem;
  font-weight: 400;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.5;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 1rem;
  }
`;

const Header = () => {
  return (
    <HeaderContainer>
      <Title>El Tiempo de tus Ciudades</Title>
      <Subtitle className="subtitle">
        Información meteorológica actualizada de las principales ciudades del mundo
      </Subtitle>
    </HeaderContainer>
  );
};

export default Header;