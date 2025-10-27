import type { IUserRepository } from "../../repositories/IUserRepository.js";
import type { IPasswordHasher } from "../../services/IPasswordHasher.js";
import type { ITokenGenerator } from "../../services/ITokenGenerator.js";

export class LoginUserUseCase {
  constructor(
    private readonly userRepo: IUserRepository,
    private readonly passwordHasher: IPasswordHasher,
    private readonly tokenGenerator: ITokenGenerator
  ) {}

  async execute(email: string, password: string): Promise<{ token: string }> {
    const user = await this.userRepo.findByEmail(email.toLowerCase());
    if (!user) throw new Error("Invalid credentials");

    const valid = await this.passwordHasher.compare(password, user.password);
    if (!valid) throw new Error("Invalid credentials");
    
    const token = this.tokenGenerator.generate({ userId: user.id, role: user.role });

    return { token };
  }
}
