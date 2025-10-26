import { Student } from "../entities/Student.js";
import type { IStudentRepository } from "../repositories/IStudentRepository.js";

export class UpdateStudentUseCase {
  constructor(private studentRepository: IStudentRepository) {}

  async execute(student: Student): Promise<Student> {
    return this.studentRepository.update(student);
  }
}
