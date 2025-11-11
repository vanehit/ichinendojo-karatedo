import { vi } from "vitest";
export const mockUserRepo = {
    create: vi.fn(async (user) => user),
    getAll: vi.fn(async () => []),
    findById: vi.fn(async (id) => null),
    findByEmail: vi.fn(async (email) => null),
    update: vi.fn(async (id, data) => null),
    delete: vi.fn(async (id) => { }),
    count: vi.fn(async () => 0),
};
