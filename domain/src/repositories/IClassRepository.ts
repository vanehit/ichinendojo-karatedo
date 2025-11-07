import type { Class } from "../entities/classes/Class.js";

export interface IClassRepository {
  create(c: Class): Promise<Class>;
  findById(id: string): Promise<Class | null>;
  getByTeacher(teacherId: string): Promise<Class[]>;
  getAll(): Promise<Class[]>;
  update(c: Class): Promise<Class>;
  delete(id: string): Promise<void>;
}
