import api from "./api.js";

export const ClassAPI = {
  getMyClasses: (teacherId: string) => api.get(`/classes/teacher/${teacherId}`),

  createClass: (data: {
    date: string;
    topic: string;
    description?: string;
    students: string[];
  }) => api.post("/classes", data),
};
