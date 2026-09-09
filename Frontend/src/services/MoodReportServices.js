import api from './axios.js';   

export async function createMoodReport(payload) {
    const response = await api.post('moodreport', payload);
    return response.data;
}

export async function refreshMoodReports() {
    const response = await api.get('moodreport/refresh');
    return response.data;
}