import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Button, TextField, Box
} from '@mui/material';
import { cursoSchema } from '../../schemas/curso.schema';

export default function CursoDialog({ open, onClose, onSave, curso }) {
    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm({
        resolver: zodResolver(cursoSchema),
        defaultValues: {
            titulo: '',
            codigo: '',
            creditos: 1
        }
    });

    useEffect(() => {
        if (curso) {
            setValue('titulo', curso.titulo);
            setValue('codigo', curso.codigo);
            setValue('creditos', curso.creditos);
        } else {
            reset({ titulo: '', codigo: '', creditos: 1 });
        }
    }, [curso, open, setValue, reset]);

    const onSubmit = (data) => {
        onSave(data);
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>{curso ? 'Editar Curso' : 'Nuevo Curso'}</DialogTitle>
            <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                <DialogContent>
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Código"
                        {...register('codigo')}
                        error={!!errors.codigo}
                        helperText={errors.codigo?.message}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Título"
                        {...register('titulo')}
                        error={!!errors.titulo}
                        helperText={errors.titulo?.message}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Créditos"
                        type="number"
                        {...register('creditos')}
                        error={!!errors.creditos}
                        helperText={errors.creditos?.message}
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