import { Navigate } from 'react-router-dom';
import { env } from '../schemas/env.schema';

export default function ProtectedRoute({ children, allowedRoles }) {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  // En modo localstorage validamos el token; 
  // en modo cookie validamos que exista la sesión del usuario guardada
  const isAuthenticated = env.VITE_AUTH_MODE === 'cookie' ? !!user : !!token;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Verificar restricción de roles
  if (allowedRoles && user && !allowedRoles.includes(user.rol)) {
    return <Navigate to="/estudiantes" replace />;
  }

  return children;
}