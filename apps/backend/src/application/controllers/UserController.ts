import { LoginUserUseCase } from './../../../../../domain/src/use-cases/users/LoginUserUseCase';
import { RegisterUserUseCase } from './../../../../../domain/src/use-cases/students/RegisterStudentUseCase';
import { MongoUserRepository } from "../../infrastructure/repositories/MongoUserRepository.js";
import type { Request, Response } from "express";
import { GetUsersUseCase } from '../../../../../domain/src/use-cases/index.js';

const userRepo = new MongoUserRepository();

export class UserController {

  static async registerUser(req: Request, res: Response) {
    try {
      const { name, email, password, role } = req.body;

      if (!name || !email || !password) {
        return res.status(400).json({ message: "Todos los campos son obligatorios." });
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ message: "El formato del correo no es válido." });
      }

      const useCase = new RegisterUserUseCase(userRepo);
      const newUser = await useCase.execute({ name, email, password, role });

      res.status(201).json(newUser.toPrimitives());
    } catch (error: any) {
      console.error("❌ Error en registerUser:", error);
      res.status(400).json({ message: error.message || "Error al registrar usuario." });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ message: "Email y contraseña son obligatorios." });
      }

      const useCase = new LoginUserUseCase(userRepo);
      const { token, user } = await useCase.execute(email, password);

      res.json({
        message: "Login exitoso",
        token,
        user: user.toPrimitives(),
      });
    } catch (error: any) {
      console.error("❌ Error en login:", error);
      res.status(401).json({ message: error.message || "Credenciales inválidas." });
    }
  }

  static async logout(req: Request, res: Response) {
     res.json({ message: "Logout exitoso. Token invalidado en frontend." });
  }

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
      const { id } = req.params;
      if (!id) return res.status(400).json({ message: "User id is required" });

      const useCase = new GetUserByIdUseCase(userRepo);
      const user = await useCase.execute(id);

      if (!user) return res.status(404).json({ message: "User not found" });
      res.json(user.toPrimitives());
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async updateUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ message: "User id is required" });

      const useCase = new UpdateUserUseCase(userRepo);
      const updated = await useCase.execute(id, req.body);

      if (!updated) return res.status(404).json({ message: "User not found" });
      res.json(updated.toPrimitives());
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async deleteUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ message: "User id is required" });

      const useCase = new DeleteUserUseCase(userRepo);
      await useCase.execute(id);

      res.json({ message: "User deleted successfully" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}
