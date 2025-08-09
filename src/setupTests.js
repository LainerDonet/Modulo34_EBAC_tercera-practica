import '@testing-library/jest-dom';

// Mock para fetch API
global.fetch = jest.fn();

// Mock para console.error en tests
const originalError = console.error;
beforeAll(() => {
  console.error = jest.fn();
});

afterAll(() => {
  console.error = originalError;
});

// Reset mocks después de cada test
afterEach(() => {
  jest.clearAllMocks();
});

// Mock para window.matchMedia (para responsive tests)
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});