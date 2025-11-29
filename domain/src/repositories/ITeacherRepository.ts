import type { Teacher } from "../entities/teachears/Teacher.js";

export interface ITeacherRepository {
  create(teacher: Teacher): Promise<Teacher>;
  findById(id: string): Promise<Teacher | null>;
  getAll(): Promise<Teacher[]>;
  update(teacher: Teacher): Promise<Teacher>;
  delete(id: string): Promise<void>;
}
