import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  // 🔐 primero intenta leer el token del localStorage
  let token = localStorage.getItem("token");

  // 🧩 si no hay token, usa el del .env (útil para Storybook)
  if (!token && import.meta.env.VITE_AUTH_TOKEN) {
    token = import.meta.env.VITE_AUTH_TOKEN;
  }

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
