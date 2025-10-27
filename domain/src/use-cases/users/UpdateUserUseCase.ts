import { User } from "../../entities/users/User.js";
import type { IUserRepository } from "../../repositories/IUserRepository.js";

export class UpdateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(id: string, data: Partial<User>): Promise<User | null> {
    return this.userRepository.update(id, data);
  }
}
