import { z } from 'zod';

export const cursoSchema = z.object({
    titulo: z.string().min(2, 'Título requerido'),
    codigo: z.string().min(2, 'Código requerido'),
    creditos: z.coerce.number().min(1, 'Mínimo 1 crédito'),
});