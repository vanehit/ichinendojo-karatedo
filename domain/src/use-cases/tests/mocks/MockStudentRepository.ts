import { vi, type Mocked } from "vitest";
import type { IStudentRepository } from "../../../repositories/IStudentRepository.js";
import type { Student } from "../../../entities/students/Student.js";

export const mockStudentRepo: Mocked<IStudentRepository> = {
  create: vi.fn(async (student: Student) => student),
  findById: vi.fn(async (id: string) => null),
  getAll: vi.fn(async () => []),
  update: vi.fn(async (student: Student) => student),
  delete: vi.fn(async (id: string) => {}),
   getByTeacher: vi.fn(async (teacherId: string) => []),
};
