import api from "./api.js";

export interface User {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "TEACHER";
  createdAt: string;
}

export const userApi = {
  getAll: async (): Promise<User[]> => {
    const { data } = await api.get("/users");
    return data;
  },

  getById: async (id: string): Promise<User> => {
    const { data } = await api.get(`/users/${id}`);
    return data;
  },

  create: async (user: Omit<User, "id" | "createdAt">): Promise<User> => {
    const { data } = await api.post("/users", user);
    return data;
  },

  update: async (id: string, user: Partial<User>): Promise<User> => {
    const { data } = await api.put(`/users/${id}`, user);
    return data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/users/${id}`);
  },
};
