import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000',
});

// Add a request interceptor
api.interceptors.request.use(
    (config) => {
        // You can add authorization headers or other custom settings here
        const token = localStorage.getItem('site-token');
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
        // Handle 401 (Unauthorized) or 403 (Forbidden) errors
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            // Token is invalid or expired - clear it and redirect to login
            localStorage.removeItem('site-token');
            window.location.href = '/';
        }
        return Promise.reject(error);
    }
);

export default api;