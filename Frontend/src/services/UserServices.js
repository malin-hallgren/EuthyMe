import api from './axios.js';

export async function getUsers() {
    try {
        const response = await api.get('user');
        return response.data;
    }
    catch (error) {
        console.error('Error retrieving users:', error);
        return { users: [], error: error.message };
    }
    finally {
        // Cleanup code if needed
    }
}

export async function getFullDashboardData() {
    const response = await api.get('user/dashboard');
    return response.data;
}

export async function registerUser(payload) {
    const response = await api.post('user/register', payload);
    return response.data;
}

export async function deleteUser(userId) {
    try {
        const response = await api.delete(`user/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error; // Rethrow the error to be handled by the caller
    }
    finally {
        // Cleanup code if needed
    }
}