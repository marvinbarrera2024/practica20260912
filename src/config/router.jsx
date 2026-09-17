import { createBrowserRouter, Navigate } from 'react-router-dom';

import MainLayout from '../components/MainLayout';
import ProtectedRoute from '../components/ProtectedRoute';
import Login from '../pages/Login';
import Usuarios from '../pages/Usuarios';
import Estudiantes from '../pages/Estudiantes';
import Cursos from '../pages/Cursos';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/estudiantes" replace />,
      },
      {
        path: 'usuarios',
        element: (
          <ProtectedRoute allowedRoles={['ADMIN']}>
            <Usuarios />
          </ProtectedRoute>
        ),
      },
      {
        path: 'estudiantes',
        element: (
          <ProtectedRoute allowedRoles={['ADMIN', 'MANTENIMIENTO']}>
            <Estudiantes />
          </ProtectedRoute>
        ),
      },
      {
        path: 'cursos',
        element: (
          <ProtectedRoute allowedRoles={['ADMIN', 'MANTENIMIENTO']}>
            <Cursos />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/estudiantes" replace />,
  },
],{
  basename: "/practica20260912" // <--- Agrega este segundo parámetro aquí
});