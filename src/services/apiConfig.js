// src/services/apiConfig.js

/**
 * API Configuration file
 * Centralizes all API endpoints and configurations
 */

// Environment variables
const API_KEY = import.meta.env.VITE_OPENAI_API_KEY || process.env.REACT_APP_OPENAI_API_KEY;
const API_URL = import.meta.env.VITE_AI_API_URL || process.env.REACT_APP_AI_API_URL;

// API Configuration Object
export const API_CONFIG = {
  // OpenAI Configuration
  openai: {
    apiKey: API_KEY,
    baseURL: API_URL || 'https://api.openai.com/v1',
    defaultModel: 'gpt-3.5-turbo',
    maxTokens: 500,
    temperature: 0.7,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`,
    },
  },
  
  // DALL-E Configuration
  dallE: {
    apiKey: API_KEY,
    baseURL: 'https://api.openai.com/v1/images/generations',
    defaultSize: '512x512',
    defaultQuality: 'standard',
    defaultStyle: 'vivid',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`,
    },
  },
  
  // Custom API endpoints
  custom: {
    // Add custom API endpoints here
    // example: 'https://api.example.com/v1'
  },
  
  // Timeouts
  timeout: 30000, // 30 seconds
  
  // Retry configuration
  retry: {
    maxRetries: 3,
    retryDelay: 1000, // 1 second
  },
};

// API Endpoints
export const ENDPOINTS = {
  // OpenAI Endpoints
  chat: '/chat/completions',
  completions: '/completions',
  embeddings: '/embeddings',
  images: '/images/generations',
  moderations: '/moderations',
  
  // Custom endpoints
  // Add your custom endpoints here
};

// Request Interceptor Configuration
export const REQUEST_CONFIG = {
  // Common headers
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  
  // With credentials
  withCredentials: false,
};

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your internet connection.',
  API_KEY_MISSING: 'API key is missing. Please check your environment variables.',
  RATE_LIMIT: 'Rate limit exceeded. Please try again later.',
  SERVER_ERROR: 'Server error. Please try again later.',
  TIMEOUT: 'Request timeout. Please try again.',
  UNAUTHORIZED: 'Unauthorized. Please check your API key.',
  NOT_FOUND: 'Resource not found.',
  BAD_REQUEST: 'Invalid request. Please check your input.',
  DEFAULT: 'An error occurred. Please try again.',
};

// Create Axios instance configuration
export const createAxiosConfig = (baseURL = API_CONFIG.openai.baseURL) => ({
  baseURL,
  timeout: API_CONFIG.timeout,
  headers: {
    ...REQUEST_CONFIG.headers,
    ...API_CONFIG.openai.headers,
  },
});

// Helper function to check if API key is set
export const isApiKeySet = () => {
  return !!API_CONFIG.openai.apiKey && API_CONFIG.openai.apiKey !== 'your_openai_api_key_here';
};

// Helper function to get full URL
export const getFullUrl = (endpoint, baseURL = API_CONFIG.openai.baseURL) => {
  return `${baseURL}${endpoint}`;
};

// Export configuration by environment
export const getConfigByEnvironment = () => {
  const environment = import.meta.env.MODE || process.env.NODE_ENV || 'development';
  
  switch (environment) {
    case 'production':
      return {
        ...API_CONFIG,
        timeout: 15000,
        retry: {
          maxRetries: 2,
          retryDelay: 2000,
        },
      };
    case 'development':
      return {
        ...API_CONFIG,
        timeout: 30000,
        retry: {
          maxRetries: 3,
          retryDelay: 1000,
        },
      };
    default:
      return API_CONFIG;
  }
};

export default API_CONFIG;