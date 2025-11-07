// ✅ teacherApi.ts
import type { FollowUpPrimitives } from "../../../../../domain/src/entities/students/FollowUp.js";
import api from "./api";

export const TeacherAPI = {
  getStudents: () => api.get("/teachers/students"),
  getFollowUps: (studentId: string) =>
    api.get(`/teachers/students/${studentId}/followups`),
  addFollowUp: (
    studentId: string,
    data: Omit<FollowUpPrimitives, "_id" | "date" | "studentId" | "teacherId">
  ) => api.post(`/teachers/students/${studentId}/followups`, data),
};
