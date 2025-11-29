import { randomUUID } from "crypto";
import type { IUserRepository } from "../../repositories/IUserRepository.js";
import type { IPasswordHasher } from "../../services/IPasswordHasher.js";
import { User, type UserRole } from "../../entities/users/User.js";

export class RegisterUserUseCase {
  constructor(
    private readonly userRepo: IUserRepository,
    private readonly passwordHasher: IPasswordHasher
  ) {}

  async execute(data: { name: string; email: string; password: string; role?: UserRole }): Promise<User> {
    if (!data.name || !data.email || !data.password) {
      throw new Error("Missing required fields");
    }

    const existing = await this.userRepo.findByEmail(data.email.toLowerCase());
    if (existing) throw new Error("Email already registered");

    const totalUsers = await this.userRepo.count();

    let userRole: UserRole;

    if (totalUsers === 0) {
      userRole = "ADMIN";
    } else {
      // requiere rol
      if (!data.role) throw new Error("Role is required for new users (except the first admin)");
      userRole = data.role;
    }

    const passwordHash = await this.passwordHasher.hash(data.password);

    const user = new User(
      randomUUID(),
      data.name.trim(),
      data.email.toLowerCase(),
      passwordHash,
      userRole
    );

    return this.userRepo.create(user);
  }
}
