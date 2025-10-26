import type { IUserRepository } from '../../../../../domain/src/repositories/IUserRepository.js';
import { User, type UserRole } from '../../../../../domain/src/entities/User.js';
import { UserModel, type IUser } from '../database/models/User.js';

export class MongoUserRepository implements IUserRepository {
  
  private toDomain(userDoc: any): User {
    const validRoles: UserRole[] = ["ADMIN","TEACHER","STUDENT"];
    const roleValue = (userDoc.role?.toUpperCase() ?? "STUDENT") as UserRole;
    const role: UserRole = validRoles.includes(roleValue) ? roleValue : "STUDENT";
    return new User(userDoc._id.toString(), userDoc.name, userDoc.email, userDoc.passwordHash, role);
  }

  async create(user: User): Promise<User> {
    const doc = new UserModel({
      _id: user.id,
      name: user.name,
      email: user.email,
      passwordHash: user.password,
      role: user.role,
      createdAt: user.createdAt,
    });
    const saved = await doc.save();
    return this.toDomain(saved);
  }

  async findByEmail(email: string): Promise<User | null> {
    const userDoc = await UserModel.findOne({ email });
    return userDoc ? this.toDomain(userDoc) : null;
  }

  async findById(id: string): Promise<User | null> {
    const doc = await UserModel.findById(id);
    return doc ? this.toDomain(doc) : null;
  }

  async getAll(): Promise<User[]> {
    const docs = await UserModel.find();
    return docs.map(this.toDomain);
  }

  async update(id: string, data: Partial<User>): Promise<User | null> {
    const updated = await UserModel.findByIdAndUpdate(
      id,
      {
        ...(data.name && { name: data.name }),
        ...(data.email && { email: data.email }),
        ...(data.role && { role: data.role }),
        ...(data.password && { passwordHash: data.password }),
      },
      { new: true }
    );
    return updated ? this.toDomain(updated) : null;
  }

  async delete(id: string): Promise<void> {
    await UserModel.findByIdAndDelete(id);
  }
}
