import type { ITeacherRepository } from "../../repositories/ITeacherRepository.js";

export class DeleteTeacherUseCase {
  constructor(private teacherRepo: ITeacherRepository) {}

  async execute(id: string): Promise<void> {
    await this.teacherRepo.delete(id);
  }
}
