import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_LOCAL_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
})



api.interceptors.response.use(
    response => response,
    error => {
        const errorMessage = error.response?.data?.message || error.message || 'An unexpected error occurred.';
        if (error.response)
        {
            if (error.response.status === 401) {
                const requestUrl = error.config?.url ?? '';

                const isPublicAuthRequest =
                    requestUrl.includes('auth/status') ||
                    requestUrl.includes('auth/login');
                if (!isPublicAuthRequest && window.location.pathname !== '/login') 
                {
                    sessionStorage.setItem('globalErrorMessage', 'Your session has expired. Please log in again.');
                }

                window.location.href = '/login';
            }
            else if (error.response.status === 404) {
                window.location.href = '/404';
            }
            else if (error.response.status === 500) {
                sessionStorage.setItem('globalErrorMessage', 'An unexpected error occurred. Please try again later.');
            }
            else {
                sessionStorage.setItem('globalErrorMessage', errorMessage);
            }
        }
        return Promise.reject(error);
    }
);

export default api;