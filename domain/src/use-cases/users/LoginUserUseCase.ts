import { jwt } from 'jsonwebtoken';
import { bcrypt } from 'bcrypt';
import type { IUserRepository } from "../../repositories/IUserRepository.js";
import { User } from "../../entities/users/User.js";

export class LoginUserUseCase {
  constructor(private userRepo: IUserRepository) {}

  async execute(email: string, password: string): Promise<{ token: string; user: User }> {
    const user = await this.userRepo.findByEmail(email.toLowerCase());
    if (!user) throw new Error("Invalid email or password");

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new Error("Invalid email or password");

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "1h" }
    );

    return { token, user };
  }
}
