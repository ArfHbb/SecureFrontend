// src/services/api.js
// API service for Tourist Arrival App
import axios from 'axios';


export const base_url = 'https://hc-bssn-ws-insecure-api-production.up.railway.app/api';
const BASE_URL = 'https://hc-bssn-ws-insecure-api-production.up.railway.app';


const api = axios.create({
  baseURL: BASE_URL,
});

// Interceptor untuk otomatis menambahkan Authorization header jika token ada di localStorage
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// USERS
export function getUsers() {
  return api.get('/api/users');
}
export function addUser(data) {
  return api.post('/api/users', data);
}

// AUTH
export function login(data) {
  return api.post('/api/login', data);
}

// ARRIVALS
export function getArrivals() {
  return api.get('/api/arrivals');
}
export function createArrival(data) {
  return api.post('/api/arrivals', data);
}
export function getArrivalDetail(id) {
  return api.get(`/api/arrivals/${id}`);
}
export function approveArrival(id, token) {
  return api.post(`/api/arrivals/${id}/approve`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  });
}
export function rejectArrival(id, token) {
  return api.post(`/api/arrivals/${id}/reject`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export default api;
