import type { ITeacherRepository } from "../../repositories/ITeacherRepository.js";
import type { Teacher } from "../../entities/teachears/Teacher.js";

export class UpdateTeacherUseCase {
  constructor(private teacherRepo: ITeacherRepository) {}

  async execute(teacher: Teacher): Promise<Teacher> {
    return this.teacherRepo.update(teacher);
  }
}
