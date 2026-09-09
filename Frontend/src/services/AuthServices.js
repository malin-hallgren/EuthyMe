import api from './axios.js';

export async function LoginUser(payload) {
    const response = await api.post('auth/login', payload);
    return response.data;
}

export async function LogoutUser() {
    const response = await api.post('auth/logout');
    return response.data;
}