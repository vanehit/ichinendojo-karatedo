
import { Student } from "../../../entities/students/Student.js";
import { vi } from "vitest";
import type { IStudentRepository } from "../../../repositories/IStudentRepository.js";

export const mockStudentRepo: IStudentRepository = {
  create: vi.fn(async (student: Student) => student),
  findById: vi.fn(async (id: string) => null),
  getAll: vi.fn(async () => []),
  update: vi.fn(async (student: Student) => student),
  delete: vi.fn(async (id: string) => {}),
};
