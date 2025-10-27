import { User } from "../../entities/users/User.js";
import type { IUserRepository } from "../../repositories/IUserRepository.js";

export class GetUsersUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(): Promise<User[]> {
    return this.userRepository.getAll();
  }
}
