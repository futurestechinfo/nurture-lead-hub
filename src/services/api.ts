
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
  
  getLeadById: async (id: number) => {
    try {
      const response = await api.get(`/leads/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Get lead ${id} error:`, error);
      throw error;
    }
  },
  
  createLead: async (leadData: any) => {
    try {
      const response = await api.post('/leads', leadData);
      return response.data;
    } catch (error) {
      console.error('Create lead error:', error);
      throw error;
    }
  },
  
  updateLead: async (id: number, leadData: any) => {
    try {
      const response = await api.put(`/leads/${id}`, leadData);
      return response.data;
    } catch (error) {
      console.error(`Update lead ${id} error:`, error);
      throw error;
    }
  },
  
  deleteLead: async (id: number) => {
    try {
      const response = await api.delete(`/leads/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Delete lead ${id} error:`, error);
      throw error;
    }
  },
  
  bulkUpdateLeads: async (ids: number[], field: string, value: string) => {
    try {
      const response = await api.put('/leads/bulk/update', { ids, field, value });
      return response.data;
    } catch (error) {
      console.error('Bulk update leads error:', error);
      throw error;
    }
  },
  
  updateLeadInterest: async (leadId: number, interested: boolean) => {
    try {
      const response = await api.post('/interest-email', { leadId, interested });
      return response.data;
    } catch (error) {
      console.error('Update lead interest error:', error);
      throw error;
    }
  }
};

// Comments Services
export const commentService = {
  getComments: async (leadId: number) => {
    try {
      const response = await api.get(`/comments/${leadId}`);
      return response.data;
    } catch (error) {
      console.error('Get comments error:', error);
      throw error;
    }
  },
  
  addComment: async (leadId: number, comment: string) => {
    try {
      const response = await api.post('/comments', { leadId, comment });
      return response.data;
    } catch (error) {
      console.error('Add comment error:', error);
      throw error;
    }
  }
};

export default api;
