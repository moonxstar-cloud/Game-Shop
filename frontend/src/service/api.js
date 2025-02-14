// src/services/api.js
import axios from 'axios';


const createApiInstance = () => {

  const api = axios.create({
    baseURL:["https://game-shop-mern.vercel.app","http://localhost:5173"] ,
    
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