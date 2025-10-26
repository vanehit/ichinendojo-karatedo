import { User } from "../entities/User.js";
import type { IUserRepository } from "../repositories/IUserRepository.js";

export class GetUserByIdUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(id: string): Promise<User | null> {
    return this.userRepository.findById(id);
  }
}
