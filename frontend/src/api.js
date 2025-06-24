import axios from 'axios';

// Create an instance of axios with a base URL
// Make axios definition for calling the API
const api = axios.create({
    // URL of backend, can couple later with target enpoint
    baseURL: 'http://localhost:8000'
});

export default api;