import api from './api';

export const estudianteService = {
    getAll: async (params) => (await api.get('/estudiantes', { params })).data,
    getById: async (id) => (await api.get(`/estudiantes/${id}`)).data,
    create: async (data) => (await api.post('/estudiantes', data)).data,
    update: async (id, data) => (await api.put(`/estudiantes/${id}`, data)).data,
    delete: async (id) => (await api.delete(`/estudiantes/${id}`)).data,
};