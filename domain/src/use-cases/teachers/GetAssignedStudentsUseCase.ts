import type { IStudentRepository } from "../../repositories/IStudentRepository.js";

export class GetAssignedStudentsUseCase {
  constructor(private readonly studentRepo: IStudentRepository) {}

  async execute(teacherId: string) {
    const students = await this.studentRepo.getByTeacher(teacherId);
    return students.map((s) => s.toPrimitives());
  }
}
