import { z } from 'zod';

export const usuarioSchema = z.object({
    nombre: z.string().min(2, 'Mínimo 2 caracteres'),
    email: z.string().email('Email inválido'),
    password: z.string().min(6, 'Mínimo 6 caracteres').optional().or(z.literal('')),
    rol: z.enum(['ADMIN', 'MANTENIMIENTO']),
});