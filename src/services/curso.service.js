import api from './api';

export const cursoService = {
    getAll: async () => (await api.get('/cursos')).data,
    getById: async (id) => (await api.get(`/cursos/${id}`)).data,
    create: async (data) => (await api.post('/cursos', data)).data,
    update: async (id, data) => (await api.put(`/cursos/${id}`, data)).data,
    delete: async (id) => (await api.delete(`/cursos/${id}`)).data,
};