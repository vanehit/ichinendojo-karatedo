import type { Request, Response } from "express";
import { MongoUserRepository } from "../../infrastructure/repositories/MongoUserRepository.js";
import { BcryptPasswordHasher } from "../../infrastructure/services/PasswordHasher.js";
import {
  GetUsersUseCase,
  GetUserByIdUseCase,
  UpdateUserUseCase,
  DeleteUserUseCase,
} from "../../../../../domain/dist/use-cases/index.js";

const userRepo = new MongoUserRepository();
const passwordHasher = new BcryptPasswordHasher();

export class UserController {

  static async getUsers(req: Request, res: Response) {
    try {
      const useCase = new GetUsersUseCase(userRepo);
      const users = await useCase.execute();
      res.json(users.map((u) => u.toPrimitives()));
    } catch (error: any) {
      console.error("❌ Error getting users:", error);
      res.status(500).json({ message: error.message });
    }
  }


  static async getUserById(req: Request, res: Response) {
    try {
      const { id } = req.params; 
      const useCase = new GetUserByIdUseCase(userRepo);
      const user = await useCase.execute(id);
      if (!user) return res.status(404).json({ message: "User not found" });
      res.json(user.toPrimitives());
    } catch (error: any) {
      console.error("❌ Error getting user by id:", error);
      res.status(500).json({ message: error.message });
    }
  }

  
  static async updateUser(req: Request, res: Response) {
    try {
      const { id } = req.params; 
      const useCase = new UpdateUserUseCase(userRepo, passwordHasher);

      const updated = await useCase.execute(id, req.body);
      res.json(updated.toPrimitives());
    } catch (error: any) {
      console.error("❌ Error updating user:", error);
      res.status(400).json({ message: error.message });
    }
  }


  static async deleteUser(req: Request, res: Response) {
    try {
      const { id } = req.params; // <-- CORREGIDO
      const useCase = new DeleteUserUseCase(userRepo);
      await useCase.execute(id);
      res.json({ message: "User deleted successfully" });
    } catch (error: any) {
      console.error("❌ Error deleting user:", error);
      res.status(500).json({ message: error.message });
    }
  }
}
