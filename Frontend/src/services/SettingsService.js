import api from './axios.js';

export async function getSettings() {
    try {
        const response = await api.get('settings');
        return response.data;
    }
    catch (error) {
        console.error("Error fetching settings:", error);
        throw error; // Rethrow the error to be handled by the caller
    }
}

export async function updateSettings(settings) {
    try {
        const response = await api.put('settings', settings);
        return response.data;
    }
    catch (error) {
        console.error("Error updating settings:", error);
        throw error; // Rethrow the error to be handled by the caller
    }
}