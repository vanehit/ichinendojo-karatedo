import { randomUUID } from "crypto";
import { User } from "../../entities/users/User.js";
import type { IUserRepository } from "../../repositories/IUserRepository.js";

export class RegisterUserUseCase {
  constructor(private readonly userRepo: IUserRepository) {}

  async execute(data: {
    name: string;
    email: string;
    password: string;
    role?: string;
  }): Promise<User> {
    if (!data.name || !data.email || !data.password) {
      throw new Error("Missing required fields: name, email or password");
    }

    // ⚡ Verifica duplicado
    const existing = await this.userRepo.findByEmail(data.email.toLowerCase());
    if (existing) throw new Error("Email already registered");

    const user = new User(
      randomUUID(),
      data.name.trim(),
      data.email.toLowerCase(),
      data.password,
      (data.role as any) ?? "STUDENT"
    );

    return await this.userRepo.create(user);
  }
}
