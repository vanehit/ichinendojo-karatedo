import type { Request, Response } from "express";
import { MongoUserRepository } from "../../infrastructure/repositories/MongoUserRepository.js";
import { BcryptPasswordHasher } from "../../infrastructure/services/PasswordHasher.js";
import {
  GetUsersUseCase,
  GetUserByIdUseCase,
  UpdateUserUseCase,
  DeleteUserUseCase
} from "../../../../../domain/dist/use-cases/index.js";

const userRepo = new MongoUserRepository();
const passwordHasher = new BcryptPasswordHasher(); // <-- lo agregamos

export class UserController {
  static async getUsers(req: Request, res: Response) {
    try {
      const useCase = new GetUsersUseCase(userRepo);
      const users = await useCase.execute();
      res.json(users.map(u => u.toPrimitives()));
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getUserById(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const useCase = new GetUserByIdUseCase(userRepo);
      const user = await useCase.execute(userId);
      if (!user) return res.status(404).json({ message: "User not found" });
      res.json(user.toPrimitives());
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async updateUser(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      // <-- Pasamos passwordHasher al constructor
      const useCase = new UpdateUserUseCase(userRepo, passwordHasher);
      const updated = await useCase.execute(userId, req.body);
      res.json(updated.toPrimitives());
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  static async deleteUser(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const useCase = new DeleteUserUseCase(userRepo);
      await useCase.execute(userId);
      res.json({ message: "User deleted successfully" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}
