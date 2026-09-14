import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { env } from '../schemas/env.schema';
import {
  Container, Box, Card, CardContent, Typography, TextField, Button, Alert
} from '@mui/material';
import { loginSchema } from '../schemas/login.schema';
import { authService } from '../services/auth.service';

export default function Login() {
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState('');

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      setErrorMsg('');
      const response = await authService.login(data);

      if (response.token) {
        if (env.VITE_AUTH_MODE === 'localstorage') {
          localStorage.setItem('token', response.token);
        }
      }
      if (response.usuario) {
        localStorage.setItem('user', JSON.stringify(response.usuario));
      }

      navigate('/estudiantes');
    } catch (err) {
      setErrorMsg(err.response?.data?.mensaje || 'Credenciales inválidas o error de conexión');
    }
  };

  return (
    <Container maxWidth="xs" sx={{ height: '100vh', display: 'flex', alignItems: 'center' }}>
      <Card sx={{ width: '100%', boxShadow: 3 }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h5" component="h1" align="center" gutterBottom fontWeight="bold">
            Iniciar Sesión
          </Typography>

          {errorMsg && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {errorMsg}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <TextField
              margin="normal"
              fullWidth
              label="Correo Electrónico"
              type="email"
              autoComplete="email"
              autoFocus
              {...register('email')}
              error={!!errors.email}
              helperText={errors.email?.message}
            />

            <TextField
              margin="normal"
              fullWidth
              label="Contraseña"
              type="password"
              autoComplete="current-password"
              {...register('password')}
              error={!!errors.password}
              helperText={errors.password?.message}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={isSubmitting}
              sx={{ mt: 3, mb: 2 }}
            >
              {isSubmitting ? 'Ingresando...' : 'Ingresar'}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}