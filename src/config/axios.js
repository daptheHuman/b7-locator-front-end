import axios from 'axios';

export default axios.create({
  baseURL: import.meta.env.VITE_APP_BACKEND_URL || `http://localhost:8000`,
  headers: { 'Access-Control-Allow-Origin': '*' },
});
