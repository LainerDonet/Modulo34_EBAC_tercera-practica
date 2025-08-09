import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(15px);
  padding: 3rem 2rem 2rem;
  color: ${props => props.theme.colors.white};
  margin-top: auto;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const SocialSection = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const SocialTitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 1.5rem;
  color: ${props => props.theme.colors.white};
  font-weight: 600;
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 2rem;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    gap: 1rem;
    flex-wrap: wrap;
  }
`;

const SocialLink = styled.a`
  color: ${props => props.theme.colors.white};
  text-decoration: none;
  font-size: 1.1rem;
  padding: 0.8rem 1.5rem;
  border-radius: 25px;
  background: rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background: ${props => props.theme.colors.accent};
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.medium};
  }
`;

const Divider = styled.hr`
  border: none;
  height: 1px;
  background: rgba(255, 255, 255, 0.2);
  margin: 2rem 0;
`;

const CopyrightSection = styled.div`
  text-align: center;
`;

const CopyrightText = styled.p`
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 0.5rem;
`;

const TechStack = styled.p`
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.6);
  font-style: italic;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <SocialSection>
          <SocialTitle>Síguenos en nuestras redes</SocialTitle>
          <SocialLinks>
            <SocialLink href="mailto:lainerdonet87@gmail.com" target="_blank" rel="noopener noreferrer">
              📧 Contacto
            </SocialLink>
            <SocialLink href="https://x.com/lainerdonet87" target="_blank" rel="noopener noreferrer">
              🐦 Twitter
            </SocialLink>
            <SocialLink href="https://www.facebook.com/donet.lainer" target="_blank" rel="noopener noreferrer">
              📘 Facebook
            </SocialLink>
            <SocialLink href="https://www.instagram.com/lainerdonet/" target="_blank" rel="noopener noreferrer">
              📷 Instagram
            </SocialLink>
            <SocialLink href="https://www.linkedin.com/in/lainerdonet/" target="_blank" rel="noopener noreferrer">
              💼 LinkedIn
            </SocialLink>
          </SocialLinks>
        </SocialSection>
        
        <Divider />
        
        <CopyrightSection>
          <CopyrightText>
            &copy; 2025 El Tiempo de tus Ciudades. Todos los derechos reservados.
          </CopyrightText>
          <CopyrightText>
            Datos meteorológicos proporcionados por OpenWeather API
          </CopyrightText>
          <TechStack>
            Desarrollado por Lainer Donet para proyecto de EBAC - React Avanzado
          </TechStack>
        </CopyrightSection>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;