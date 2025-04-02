
import axios from 'axios';

// Base API URL - change this to your actual backend URL
const API_URL = 'http://localhost:8000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add authentication token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth Services
export const authService = {
  login: async (username: string, password: string) => {
    try {
      const response = await api.post('/auth/login', { username, password });
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },
  
  // Add more auth services as needed
};

// Lead Services
export const leadService = {
  getLeads: async () => {
    try {
      const response = await api.get('/leads');
      return response.data;
    } catch (error) {
      console.error('Get leads error:', error);
      throw error;
    }
  },
  
  // Add more lead services as needed
};

export default api;
