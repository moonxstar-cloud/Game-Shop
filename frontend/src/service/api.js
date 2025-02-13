// src/services/api.js
import axios from 'axios';
import API_BASE_URL from '../api';

const createApiInstance = () => {
  const api = axios.create({
    baseURL:  process.env.REACT_APP_BACKEND_URL,
  });

  // Add a request interceptor to add the token
  api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  return api;
};

export const api = createApiInstance();