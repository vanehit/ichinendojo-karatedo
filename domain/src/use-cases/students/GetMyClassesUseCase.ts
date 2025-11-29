import type { IClassRepository } from "../../repositories/IClassRepository.js";

export class GetMyClassesUseCase {
  constructor(private readonly classRepo: IClassRepository) {}

  async execute(teacherId: string) {
    const classes = await this.classRepo.getByTeacher(teacherId);
    return classes.map((c) => c.toPrimitives());
  }
}

