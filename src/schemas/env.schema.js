import { z } from 'zod';

export const envSchema = z.object({
  VITE_API_URL: z.string().url('VITE_API_URL debe ser una URL válida'),
  VITE_AUTH_MODE: z.enum(['localstorage', 'cookie'], {
    errorMap: () => ({ message: 'VITE_AUTH_MODE debe ser "localstorage" o "cookie"' }),
  }).default('localstorage'),
});

export const env = envSchema.parse(import.meta.env);