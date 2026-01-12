import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:{BACKEND_PORT}',
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
export default api;