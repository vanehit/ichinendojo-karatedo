// src/domain/repositories/IStudentRepository.ts
import type { Student } from "../entities/students/Student.js";

export interface IStudentRepository {
  create(student: Student): Promise<Student>;
  findById(id: string): Promise<Student | null>;
  getAll(): Promise<Student[]>;
  update(student: Student): Promise<Student>;
  delete(id: string): Promise<void>;
}
