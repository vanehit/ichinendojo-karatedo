import { User } from './../../../../../domain/src/entities/User';
import { UserModel } from "../../infrastructure/database/models/User";

export class UserRepository {
  // Crear un nuevo usuario
  async create(data: Partial<User>): Promise<User> {
    const user = new UserModel(data);
    return (await user.save()) as unknown as User;
  }

  // Obtener todos los usuarios
  async getAll(): Promise<User[]> {
    const users = await UserModel.find();
    return users as unknown as User[];
  }

  // Buscar usuario por ID
  async findById(id: string): Promise<User | null> {
    const user = await UserModel.findById(id);
    return user as unknown as User | null;
  }

  // Actualizar usuario por ID
  async update(id: string, data: Partial<User>): Promise<User | null> {
    const updatedUser = await UserModel.findByIdAndUpdate(id, data, { new: true });
    return updatedUser as unknown as User | null;
  }

  // Eliminar usuario por ID
  async delete(id: string): Promise<void> {
    await UserModel.findByIdAndDelete(id);
  }
}
