import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Button, TextField, Box
} from '@mui/material';
import { estudianteSchema } from '../../schemas/estudiante.schema';

export default function EstudianteDialog({ open, onClose, onSave, estudiante }) {
    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm({
        resolver: zodResolver(estudianteSchema),
        defaultValues: {
            nombre: '',
            apellido: '',
            email: '',
            edad: 18
        }
    });

    useEffect(() => {
        if (estudiante) {
            setValue('nombre', estudiante.nombre);
            setValue('apellido', estudiante.apellido);
            setValue('email', estudiante.email);
            setValue('edad', estudiante.edad);
        } else {
            reset({ nombre: '', apellido: '', email: '', edad: 18 });
        }
    }, [estudiante, open, setValue, reset]);

    const onSubmit = (data) => {
        onSave(data);
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>{estudiante ? 'Editar Estudiante' : 'Nuevo Estudiante'}</DialogTitle>
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
                        label="Apellido"
                        {...register('apellido')}
                        error={!!errors.apellido}
                        helperText={errors.apellido?.message}
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
                        label="Edad"
                        type="number"
                        {...register('edad')}
                        error={!!errors.edad}
                        helperText={errors.edad?.message}
                    />
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