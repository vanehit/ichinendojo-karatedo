import { Request, Response } from "express";
import { UserModel } from "../../infrastructure/database/models/User";


export class UserController {
  // Obtener todos los usuarios
  static async getUsers(req: Request, res: Response) {
    try {
      const users = await UserModel.find();
      res.json(users);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error fetching users" });
    }
  }

  // Registrar usuario
  static async registerUser(req: Request, res: Response) {
    try {
      const newUser = new UserModel(req.body);
      await newUser.save();
      res.status(201).json(newUser);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error registering user" });
    }
  }

  // Obtener usuario por ID
  static async getUserById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await UserModel.findById(id);
      if (!user) return res.status(404).json({ message: "User not found" });
      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error fetching user" });
    }
  }

  // Actualizar usuario
  static async updateUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updatedUser = await UserModel.findByIdAndUpdate(id, req.body, { new: true });
      if (!updatedUser) return res.status(404).json({ message: "User not found" });
      res.json(updatedUser);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error updating user" });
    }
  }

  // Eliminar usuario
  static async deleteUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const deletedUser = await UserModel.findByIdAndDelete(id);
      if (!deletedUser) return res.status(404).json({ message: "User not found" });
      res.json({ message: "User deleted successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error deleting user" });
    }
  }
}
