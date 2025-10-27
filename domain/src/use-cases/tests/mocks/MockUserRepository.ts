import { vi } from "vitest";
import type { IUserRepository } from "../../../repositories/IUserRepository.js";
import type { User } from "../../../entities/users/User.js";

export const mockUserRepo: IUserRepository = {
  create: vi.fn(async (user: User) => user),
  getAll: vi.fn(async () => []),
  findById: vi.fn(async (id: string) => null),
  findByEmail: vi.fn(async (email: string) => null),
  update: vi.fn(async (id: string, data: Partial<User>) => null),
  delete: vi.fn(async (id: string) => {}),
};
