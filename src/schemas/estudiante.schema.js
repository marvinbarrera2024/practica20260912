import { z } from 'zod';

export const estudianteSchema = z.object({
    nombre: z.string().min(2, 'Nombre requerido'),
    apellido: z.string().min(2, 'Apellido requerido'),
    email: z.string().email('Email inválido'),
    edad: z.coerce.number().min(1, 'Edad requerida'),
});