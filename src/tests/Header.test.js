import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import Header from '../components/Header';

const mockTheme = {
  colors: {
    primary: '#667eea',
    white: '#ffffff',
    gray: '#6b7280'
  }
};

const renderWithTheme = (component) => {
  return render(
    <ThemeProvider theme={mockTheme}>
      {component}
    </ThemeProvider>
  );
};

describe('Header Component', () => {
  test('renders main title correctly', () => {
    renderWithTheme(<Header />);
    
    const titleElement = screen.getByRole('heading', { 
      name: /el tiempo de tus ciudades/i 
    });
    expect(titleElement).toBeInTheDocument();
  });

  test('renders subtitle with correct text', () => {
    renderWithTheme(<Header />);
    
    const subtitleElement = screen.getByText(
      /información meteorológica actualizada de las principales ciudades del mundo/i
    );
    expect(subtitleElement).toBeInTheDocument();
  });

  test('header has correct semantic structure', () => {
    renderWithTheme(<Header />);
    
    const headerElement = screen.getByRole('banner');
    expect(headerElement).toBeInTheDocument();
  });

  test('title is an h1 element', () => {
    renderWithTheme(<Header />);
    
    const titleElement = screen.getByRole('heading', { level: 1 });
    expect(titleElement).toBeInTheDocument();
    expect(titleElement.tagName).toBe('H1');
  });

  test('subtitle is rendered as paragraph', () => {
    const { container } = renderWithTheme(<Header />);
    
    const subtitleElement = container.querySelector('.subtitle');
    expect(subtitleElement).toBeInTheDocument();
    expect(subtitleElement.tagName).toBe('P');
  });
});