import api from './api';

export const usuarioService = {
    getAll: async () => (await api.get('/usuarios')).data,
    getById: async (id) => (await api.get(`/usuarios/${id}`)).data,
    create: async (data) => (await api.post('/usuarios', data)).data,
    update: async (id, data) => (await api.put(`/usuarios/${id}`, data)).data,
    delete: async (id) => (await api.delete(`/usuarios/${id}`)).data,
};