import axios from 'axios';
import { env } from '../schemas/env.schema';

const api = axios.create({
  baseURL: env.VITE_API_URL,
  withCredentials: env.VITE_AUTH_MODE === 'cookie',
});

// Interceptor de Solicitud (Request): Adjunta cabeceras/tokens
api.interceptors.request.use((config) => {
  if (env.VITE_AUTH_MODE === 'cookie') {
    config.headers['x-use-cookie'] = 'true';
  } else {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
  }
  return config;
});

// Interceptor de Respuesta (Response): Maneja errores globales de autenticación
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Si la API responde con 401 (No autorizado) o 403 (Prohibido/Token expirado)
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      // Limpiar la sesión local
      localStorage.removeItem('token');
      localStorage.removeItem('user');

      // Evitar bucle infinito si la petición que falló ya era la de /login
      if (!window.location.pathname.includes('/login')) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;