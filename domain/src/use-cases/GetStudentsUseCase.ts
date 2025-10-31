import type { Student } from "../entities/index.js";
import type { IStudentRepository } from "../repositories/IStudentRepository.js";


export class GetStudentsUseCase {
  constructor(private studentRepository: IStudentRepository) {}

  async execute(): Promise<Student[]> {
    return this.studentRepository.getAll();
  }
}
