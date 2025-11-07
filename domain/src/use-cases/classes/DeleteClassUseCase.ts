import type { IClassRepository } from "../../repositories/IClassRepository.js";

export class DeleteClassUseCase {
  constructor(private classRepo: IClassRepository) {}

  async execute(id: string): Promise<void> {
    return await this.classRepo.delete(id);
  }
}
