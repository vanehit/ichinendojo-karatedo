import { randomUUID } from "crypto";
import { User } from "../entities/User.js";
import type { IUserRepository } from "../repositories/IUserRepository.js";

export class RegisterUserUseCase {
  constructor(private userRepo: IUserRepository) {}

  async execute(data: {
    name: string;
    email: string;
    password: string;
    role?: string;
  }): Promise<User> {
    const user = new User(
      randomUUID(),
      data.name,
      data.email,
      data.password, 
      (data.role as any) ?? "STUDENT"
    );

    return this.userRepo.create(user);
  }
}
