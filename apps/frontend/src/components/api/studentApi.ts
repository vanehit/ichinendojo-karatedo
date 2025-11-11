import api from "./api.js";

export interface Student {
  _id: string;
  name: string;
  email: string;
  userId: string;
  birthDate: string;
  belt: string;
  phone?: string;
  photo?: string;
  entryDate?: string; 
  createdAt?: string;
}

export const studentApi = {
  async getAll(): Promise<Student[]> {
    const { data } = await api.get("/students");
    return data;
  },

  async getById(id: string): Promise<Student> {
    const { data } = await api.get(`/students/${id}`);
    return data;
  },

  async create(student: Omit<Student, "_id" | "createdAt">): Promise<Student> {
    const { data } = await api.post("/students", student);
    return data;
  },

  async update(id: string, student: Partial<Student>): Promise<Student> {
    const { data } = await api.put(`/students/${id}`, student);
    return data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/students/${id}`);
  },
};
