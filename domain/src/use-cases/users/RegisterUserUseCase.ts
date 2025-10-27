import { randomUUID } from "crypto";
import { User } from "../../entities/users/User.js";
import type { IUserRepository } from "../../repositories/IUserRepository.js";
import type { IPasswordHasher } from "../../services/IPasswordHasher.js";

export class RegisterUserUseCase {
  constructor(
    private readonly userRepo: IUserRepository,
    private readonly passwordHasher: IPasswordHasher
  ) {}

  async execute(data: { name: string; email: string; password: string; role?: string }): Promise<User> {
    if (!data.name || !data.email || !data.password) throw new Error("Missing required fields");

    const existing = await this.userRepo.findByEmail(data.email.toLowerCase());
    if (existing) throw new Error("Email already registered");

    // ✅ Usamos el PasswordHasher inyectado
    const passwordHash = await this.passwordHasher.hash(data.password);

    const user = new User(
      randomUUID(),
      data.name.trim(),
      data.email.toLowerCase(),
      passwordHash,
      (data.role as any) ?? "STUDENT"
    );

    return this.userRepo.create(user);
  }
}
