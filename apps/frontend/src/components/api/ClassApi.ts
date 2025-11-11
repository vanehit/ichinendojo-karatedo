import api from "./api.js";

export const ClassAPI = {
  async getMyClasses() {
    return api.get("/teachers/classes");
  },
  
  async createClass(data: {
    date: string;
    topic: string;
    description?: string;
    students: string[];
  }) {
    return api.post("/classes", data);
  },
};
