import type { ITeacherRepository } from "../../repositories/ITeacherRepository.js";
import type { Teacher } from "../../entities/teachears/Teacher.js";

export class GetTeachersUseCase {
  constructor(private teacherRepo: ITeacherRepository) {}

  async execute(): Promise<Teacher[]> {
    return this.teacherRepo.getAll();
  }
}
