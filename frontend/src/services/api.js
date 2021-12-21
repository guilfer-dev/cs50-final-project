// libraries
import axios from "axios"

// create an api instance
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});

// intercepts everything that passes from the api and adds the token if it was found
api.interceptors.request.use(config => {
    const token = localStorage.getItem("token")
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});


export default api;