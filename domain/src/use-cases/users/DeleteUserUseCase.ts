import type { IUserRepository } from "../../repositories/IUserRepository.js";

export class DeleteUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}
