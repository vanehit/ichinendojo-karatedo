import type { IClassRepository } from "../../repositories/IClassRepository.js";

export class GetAllClassesUseCase {
  constructor(private classRepo: IClassRepository) {}

  async execute() {
    return await this.classRepo.getAll();
  }
}
