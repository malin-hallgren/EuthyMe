import api from './axios.js';

export async function getUsers() {
    const response = await api.get('user');
    return response.data;
}

export async function getFullDashboardData() {
    const response = await api.get('user/dashboard');
    return response.data;
}

export async function registerUser(payload) {
    const response = await api.post('user/register', payload);
    return response.data;
}