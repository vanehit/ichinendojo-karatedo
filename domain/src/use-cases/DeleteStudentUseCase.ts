import type { IStudentRepository } from "../repositories/IStudentRepository.js";

export class DeleteStudentUseCase {
  constructor(private studentRepository: IStudentRepository) {}

  async execute(id: string): Promise<void> {
    await this.studentRepository.delete(id);
  }
}
