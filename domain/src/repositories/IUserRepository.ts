import { User } from "../entities/User.js";

export interface IUserRepository {
  create(user: User): Promise<User>;
  getAll(): Promise<User[]>;
  findById(id: string): Promise<User | null>;
  update(id: string, data: Partial<User>): Promise<User | null>;
  delete(id: string): Promise<void>;
}
