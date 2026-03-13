import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || '/api',
});

// Add a request interceptor
api.interceptors.request.use(
    (config) => {
        // You can add authorization headers or other custom settings here
        const token = sessionStorage.getItem('site-token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
);

// Add a response interceptor to handle token expiration
api.interceptors.response.use(
    (response) => {
        // If the response is successful, just return it
        return response;
    },
    (error) => {
        const url = error.config?.url || '';
        const isAuthRoute = url.includes('/auth/login') || url.includes('/auth/signup') || url.includes('/auth/logout');

        // Handle 401/403 errors — but NOT on auth routes where
        // we expect these statuses for wrong credentials / duplicate users.
        if (
            !isAuthRoute &&
            error.response &&
            (error.response.status === 401 || error.response.status === 403)
        ) {
            // Token is invalid or expired - clear it and redirect to login
            sessionStorage.removeItem('site-token');
            window.location.href = '/';
        }
        return Promise.reject(error);
    }
);

export default api;