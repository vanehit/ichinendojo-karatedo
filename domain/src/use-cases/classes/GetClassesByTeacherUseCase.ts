import type { IClassRepository } from "../../repositories/IClassRepository.js";

export class GetClassesByTeacherUseCase {
  constructor(private classRepo: IClassRepository) {}

  async execute(teacherId: string) {
    return await this.classRepo.getByTeacher(teacherId);
  }
}
