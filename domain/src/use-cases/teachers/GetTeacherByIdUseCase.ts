import type { ITeacherRepository } from "../../repositories/ITeacherRepository.js";

export class GetTeacherByIdUseCase {
  constructor(private teacherRepo: ITeacherRepository) {}

  async execute(id: string) {
    if (!id) throw new Error("Teacher ID is required");
    return this.teacherRepo.findById(id);
  }
}
