import type { Student } from "../../entities/index.js";
import type { IStudentRepository } from "../../repositories/IStudentRepository.js";


export class GetStudentByIdUseCase {
  constructor(private studentRepository: IStudentRepository) {}

  async execute(id: string): Promise<Student | null> {
    return this.studentRepository.findById(id);
  }
}

