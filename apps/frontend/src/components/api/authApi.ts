import api from "./api.js";

export const login = (credentials: { email: string; password: string }) =>
  api.post("/auth/login", credentials);

export const register = (data: { name: string; email: string; password: string; role: string }) =>
  api.post("/auth/register", data);
