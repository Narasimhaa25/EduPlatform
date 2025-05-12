import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5001/api',
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000 // 10 second timeout
});

// Request interceptor for API calls
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for API calls
api.interceptors.response.use(
  response => response,
  async (error) => {
    if (error.response) {
      const { status } = error.response;

      switch (status) {
        case 401:
          // Handle unauthorized access
          localStorage.removeItem('token');
          window.location.href = '/auth?mode=login';
          break;
        
        case 404:
          // Handle not found
          console.error('Resource not found:', error.response.data);
          break;

        default:
          console.error('API Error:', {
            data: error.response.data,
            status: error.response.status
          });
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Network error - no response received');
    } else {
      // Something happened in setting up the request
      console.error('Request setup error:', error.message);
    }

    return Promise.reject(error);
  }
);

// Helper methods
const apiHelpers = {
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },

  clearAuth: () => {
    localStorage.removeItem('token');
  },

  // Retry failed requests
  retryRequest: async (fn, retries = 3, delay = 1000) => {
    try {
      return await fn();
    } catch (error) {
      if (retries === 0) throw error;
      await new Promise(resolve => setTimeout(resolve, delay));
      return apiHelpers.retryRequest(fn, retries - 1, delay * 2);
    }
  }
};

api.helpers = apiHelpers;

export default api;