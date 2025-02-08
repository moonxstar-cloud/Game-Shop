import { useMutation } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginStart, loginSuccess, loginFailure } from '../slice/authSlice';
import axios from 'axios';
const token = localStorage.getItem('token');

const api = axios.create({
  baseURL: 'http://localhost:3000/api', // Make sure this matches your backend URL
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  }
});

export function useAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: async (credentials) => {
      dispatch(loginStart());
      const response = await api.post('/auth/login', credentials);
      return response.data;
    },
    onSuccess: (data) => {
      dispatch(loginSuccess({
        user: {
          email: data.email,
          name: data.name,
        },
        token: data.token
      }));
      navigate('/');
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.error || 'Login failed';
      dispatch(loginFailure(errorMessage));
    }
  });

  const registerMutation = useMutation({
    mutationFn: async (userData) => {
      const response = await api.post('/auth/register', userData);
      return response.data;
    },
    onSuccess: () => {
      navigate('/login');
    },
    onError: (error) => {
      throw new Error(error.response?.data?.error || 'Registration failed');
    }
  });

  return {
    login: loginMutation.mutate,
    register: registerMutation.mutate,
    isLoading: loginMutation.isPending || registerMutation.isPending,
    error: loginMutation.error?.message || registerMutation.error?.message
  };
}