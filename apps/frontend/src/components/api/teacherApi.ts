import api from "./api.js";

export interface FollowUpPrimitives {
  _id: string;
  teacherId: string;
  studentId: string;
  comment: string;
  progress: string; // Ej: "Excelente", "Regular", "Falta mejorar"
  date: Date;
}

export const TeacherAPI = {
  getStudents: () => api.get("/teachers/students"),

  getFollowUps: (studentId: string) =>
    api.get<FollowUpPrimitives[]>(`/teachers/students/${studentId}/followups`),

  addFollowUp: (
    studentId: string,
    data: Omit<FollowUpPrimitives, "_id" | "date" | "studentId" | "teacherId">
  ) =>
    api.post(`/teachers/students/${studentId}/followups`, data),
};