import api from './axios.js';

export async function LoginUser(payload) {
    const response = await api.post('auth/login', payload);
    return response.data;
}

export async function LogoutUser() {
    const response = await api.post('auth/logout');
    return response.data;
}

export async function CheckAuthStatus() {
    try {
        const response = await api.get('auth/status');
        return response.data;
    }
    catch (error) {
        console.error('Error checking authentication status:', error);
        return { isAuthenticated: false, role: null, error: error.message };
    }
    finally {
        // Cleanup code if needed
    }
}

export async function updatePassword(payload) {
    const response = await api.post('auth/update/password', payload);
    return response.data;
}