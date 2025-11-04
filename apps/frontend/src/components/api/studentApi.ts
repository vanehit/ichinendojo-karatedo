import api from "./api";

export interface Student {
  _id: string;
  name: string;
  email: string;
  userId: string;
  birthDate: string;
  belt: string;
  phone?: string;
  photo?: string;
  createdAt?: string;
}

export const studentApi = {
  getAll: async (): Promise<Student[]> => {
    const { data } = await api.get("/students");
    return data;
  },

  getById: async (id: string): Promise<Student> => {
    const { data } = await api.get(`/students/${id}`);
    return data;
  },

  create: async (student: Omit<Student, "_id" | "createdAt">): Promise<Student> => {
    const { data } = await api.post("/students", student);
    return data;
  },

  update: async (id: string, student: Partial<Student>): Promise<Student> => {
    const { data } = await api.put(`/students/${id}`, student);
    return data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/students/${id}`);
  },
};
