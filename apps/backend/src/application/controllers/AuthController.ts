import type { Request, Response } from "express";
import { LoginUserUseCase } from "../../../../../domain/src/use-cases/users/LoginUserUseCase.js";
import { RegisterUserUseCase } from "../../../../../domain/src/use-cases/users/RegisterUserUseCase.js";
import { MongoUserRepository } from "@infrastructure/repositories/MongoUserRepository.js";
import { BcryptPasswordHasher } from "@infrastructure/services/PasswordHasher.js";
import { JwtTokenGenerator } from "@infrastructure/services/TokenGenerator.js";


const userRepo = new MongoUserRepository();
const passwordHasher = new BcryptPasswordHasher();
const tokenGenerator = new JwtTokenGenerator();

export class AuthController {
  static async register(req: Request, res: Response) {
    try {
      const { name, email, password, role } = req.body;
      const useCase = new RegisterUserUseCase(userRepo, passwordHasher);
      const user = await useCase.execute({ name, email, password, role });
      res.status(201).json(user.toPrimitives());
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const useCase = new LoginUserUseCase(userRepo, passwordHasher, tokenGenerator);
      const { token } = await useCase.execute(email, password);
      res.json({ token });
    } catch (error: any) {
      res.status(401).json({ message: error.message });
    }
  }
}
