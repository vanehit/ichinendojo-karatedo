import type { IUserRepository } from "../../repositories/IUserRepository.js";
import type { User } from "../../entities/users/User.js";

export class GetUserByIdUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(id: string): Promise<User | null> {
    if (!id) throw new Error("User ID is required");
    return this.userRepository.findById(id);
  }
}
