// frontend/src/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api'  // ✅ base URL must match server.js
});

export default API;
