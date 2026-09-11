import api from './axios.js';

export async function getSettings() {
    try {
        const response = await api.get('settings');
        return response.data;
    }
    catch (error) {
        console.error('Error fetching settings:', error);
        throw error; // Rethrow the error to be handled by the caller
    }
}