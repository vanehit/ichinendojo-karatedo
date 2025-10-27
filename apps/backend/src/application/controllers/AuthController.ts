import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { MongoUserRepository } from "../../infrastructure/repositories/MongoUserRepository.js";
import { RegisterUserUseCase } from "../../../../../domain/src/use-cases/users/RegisterUserUseCase.js";

const userRepo = new MongoUserRepository();
const JWT_SECRET = process.env.JWT_SECRET || "secret";
const JWT_EXPIRATION = "2h";

export class AuthController {
  static async register(req: Request, res: Response) {
    try {
      const { name, email, password, role } = req.body;
      if (!name || !email || !password) {
        return res.status(400).json({ message: "Todos los campos son requeridos" });
      }

      const useCase = new RegisterUserUseCase(userRepo);
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await useCase.execute({ name, email, password: hashedPassword, role });

      const userData = newUser.toPrimitives();
      delete (userData as any).passwordHash;
      res.status(201).json(userData);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      if (!email || !password)
        return res.status(400).json({ message: "Email y password son requeridos" });

      const user = await userRepo.findByEmail(email);
      if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword)
        return res.status(401).json({ message: "Credenciales incorrectas" });

      const token = jwt.sign(
        { id: user.id, role: user.role, email: user.email },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRATION }
      );

      res.json({ token, user: user.toPrimitives() });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async logout(req: Request, res: Response) {
    try {
      // En JWT no se "invalida" en el server, solo se borra del cliente.
      res.json({ message: "Logout exitoso. El token debe eliminarse del cliente." });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}
