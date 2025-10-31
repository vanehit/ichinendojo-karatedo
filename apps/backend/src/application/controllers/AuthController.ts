import type { Request, Response } from "express";
import { MongoUserRepository } from "../../infrastructure/repositories/MongoUserRepository.js";
import { BcryptPasswordHasher } from "../../infrastructure/services/PasswordHasher.js";
import { JwtTokenGenerator } from "../../infrastructure/services/TokenGenerator.js";
import { LoginUserUseCase, RegisterUserUseCase } from "../../../../../domain/dist/use-cases/index.js";
import { User } from "../../../../../domain/dist/entities/index.js";


const userRepo = new MongoUserRepository();
const passwordHasher = new BcryptPasswordHasher();
const tokenGenerator = new JwtTokenGenerator();

export class AuthController {
  // LOGIN
  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const useCase = new LoginUserUseCase(userRepo, passwordHasher, tokenGenerator);
      const { token, user } = await useCase.execute(email, password);

      console.log("LoginUserUseCase user instance:", user instanceof User);

      return res.json({
        token,
        user: user.toPrimitives()
      });
    } catch (error: any) {
      return res.status(401).json({ message: error.message });
    }
  }

  // REGISTER
  static async register(req: Request, res: Response) {
  try {
    const { name, email, password } = req.body; 
    const useCase = new RegisterUserUseCase(userRepo, passwordHasher);
    
    const newUser = await useCase.execute({ name, email, password, role: "USER" });

    return res.status(201).json(newUser.toPrimitives());
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
}

  // LOGOUT
  static async logout(req: Request, res: Response) {
    // Solo retornamos un mensaje, ya que el token lo manejamos en el frontend
    return res.json({ message: "Logout successful" });
  }
}
