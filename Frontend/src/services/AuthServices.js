import api from './axios.js';

export async function loginUser(payload) {
    const response = await api.post('auth/login', payload);
    return response.data;
}

export async function logoutUser() {
    const response = await api.post('auth/logout');
    return response.data;
}

export async function checkAuthStatus() {
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
    try {
        const response = await api.post('auth/update/password', payload);
        return response.data;
    } catch (error) {
        console.error('Error updating password:', error);
        throw error;
    }
}