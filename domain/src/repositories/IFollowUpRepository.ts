import type { FollowUp } from "../entities/students/FollowUp.js";

export interface IFollowUpRepository {
  create(followUp: FollowUp): Promise<FollowUp>;
  getByStudent(studentId: string): Promise<FollowUp[]>;
  getByTeacher(teacherId: string): Promise<FollowUp[]>;
}
