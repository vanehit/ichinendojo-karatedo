import { vi } from "vitest";
export const mockStudentRepo = {
    create: vi.fn(async (student) => student),
    findById: vi.fn(async (id) => null),
    getAll: vi.fn(async () => []),
    update: vi.fn(async (student) => student),
    delete: vi.fn(async (id) => { }),
    getByTeacher: vi.fn(async (teacherId) => []),
};
