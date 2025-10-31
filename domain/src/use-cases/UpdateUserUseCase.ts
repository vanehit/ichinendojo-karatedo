import type { IUserRepository } from "../repositories/IUserRepository.js";
import type { IPasswordHasher } from "../services/IPasswordHasher.js";
import { User, type UserRole } from "../entities/users/User.js";

export class UpdateUserUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly passwordHasher: IPasswordHasher
  ) {}

  async execute(id: string, data: Partial<User & { password?: string }>): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) throw new Error("User not found");

    if (data.name) user.name = data.name.trim();
    if (data.email) user.email = data.email.toLowerCase();

    if (data.role) {
      const validRoles: UserRole[] = ["ADMIN", "TEACHER", "STUDENT", "USER"];
      if (!validRoles.includes(data.role)) throw new Error(`Invalid role: ${data.role}`);
      user.role = data.role;
    }

    if (data.password) {
      const passwordHash = await this.passwordHasher.hash(data.password);
      user.setPassword(passwordHash);
    }

    const updated = await this.userRepository.update(id, user);
    if (!updated) throw new Error("Error updating user");

    return updated;
  }
}
