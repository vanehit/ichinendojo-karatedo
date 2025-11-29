import type { IUserRepository } from "../../repositories/IUserRepository.js";
import type { User } from "../../entities/users/User.js";

export class GetUsersUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(): Promise<User[]> {
    return this.userRepository.getAll();
  }
}
