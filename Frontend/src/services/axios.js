import axios from "axios";

import ErrorMessagesText from "../text-content/ErrorMessagesText.json";

const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
})



api.interceptors.response.use(
    response => response,
    error => {
        const errorMessage = ErrorMessagesText.ERR_GENERIC_500 ||error.response?.data?.message || error.message;
        if (error.response)
        {
            if (error.response.status === 401) {
                const requestUrl = error.config?.url ?? '';

                const isPublicAuthRequest =
                    requestUrl.includes('auth/status') ||
                    requestUrl.includes('auth/login');
                if (!isPublicAuthRequest && window.location.pathname !== '/login') 
                {
                    sessionStorage.setItem('globalErrorMessage', ErrorMessagesText.ERR_SESSION_EXPIRED || 'Your session has expired. Please log in again.');
                }

                window.location.href = '/login';
            }
            else if (error.response.status === 404) {
                window.location.href = '/404';
            }
            else if (error.response.status === 500) {
                sessionStorage.setItem('globalErrorMessage', ErrorMessagesText.ERR_GENERIC_500);
            }
            else {
                sessionStorage.setItem('globalErrorMessage', errorMessage);
            }
        }
        return Promise.reject(error);
    }
);

export default api;