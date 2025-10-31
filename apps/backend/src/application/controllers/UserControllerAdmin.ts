import type { Request, Response } from "express";
import { MongoUserRepository } from "../../infrastructure/repositories/MongoUserRepository.js";
import { BcryptPasswordHasher } from "../../infrastructure/services/PasswordHasher.js";
import { RegisterUserUseCase } from "../../../../../domain/dist/use-cases/index.js";

const userRepo = new MongoUserRepository();
const passwordHasher = new BcryptPasswordHasher();

export class UserControllerAdmin {
  static async createUser(req: Request, res: Response) {
    try {
      const { name, email, password, role } = req.body;

      // Validamos rol permitido
      const validRoles = ["ADMIN", "TEACHER"];
      if (!validRoles.includes(role)) {
        return res.status(400).json({ message: "Invalid role" });
      }

      const useCase = new RegisterUserUseCase(userRepo, passwordHasher);
      const newUser = await useCase.execute({ name, email, password, role });

      return res.status(201).json(newUser.toPrimitives());
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
}
