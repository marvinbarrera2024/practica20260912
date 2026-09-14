import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, MenuItem, Box
} from '@mui/material';
import { usuarioSchema } from '../../schemas/usuario.schema';

export default function UsuarioDialog({ open, onClose, onSave, usuario }) {
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(usuarioSchema),
    defaultValues: {
      nombre: '',
      email: '',
      password: '',
      rol: 'MANTENIMIENTO'
    }
  });

  useEffect(() => {
    if (usuario) {
      setValue('nombre', usuario.nombre);
      setValue('email', usuario.email);
      setValue('rol', usuario.rol);
      setValue('password', '');
    } else {
      reset({ nombre: '', email: '', password: '', rol: 'MANTENIMIENTO' });
    }
  }, [usuario, open, setValue, reset]);

  const onSubmit = (data) => {
    onSave(data);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{usuario ? 'Editar Usuario' : 'Nuevo Usuario'}</DialogTitle>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <TextField
            fullWidth
            margin="normal"
            label="Nombre"
            {...register('nombre')}
            error={!!errors.nombre}
            helperText={errors.nombre?.message}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            type="email"
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            fullWidth
            margin="normal"
            label={usuario ? "Contraseña (dejar en blanco para no cambiar)" : "Contraseña"}
            type="password"
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <TextField
            select
            fullWidth
            margin="normal"
            label="Rol"
            defaultValue="MANTENIMIENTO"
            {...register('rol')}
            error={!!errors.rol}
            helperText={errors.rol?.message}
          >
            <MenuItem value="ADMIN">ADMIN</MenuItem>
            <MenuItem value="MANTENIMIENTO">MANTENIMIENTO</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={onClose}>Cancelar</Button>
          <Button type="submit" variant="contained">
            Guardar
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}