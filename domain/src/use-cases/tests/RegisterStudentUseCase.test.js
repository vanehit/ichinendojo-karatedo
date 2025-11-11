import { describe, it, expect, vi, beforeEach } from "vitest";
import { RegisterStudentUseCase } from "../RegisterStudentUseCase.js";
import { mockStudentRepo } from "./mocks/MockStudentRepository.js";
describe("RegisterStudentUseCase", () => {
    beforeEach(() => vi.clearAllMocks());
    it("creates a student with default belt WHITE", async () => {
        const useCase = new RegisterStudentUseCase(mockStudentRepo);
        const studentData = {
            name: "Lucas",
            email: "lucas@gmail.com",
            userId: "user-123",
            birthDate: new Date("2010-01-01"),
        };
        const result = await useCase.execute(studentData);
        expect(mockStudentRepo.create).toHaveBeenCalledTimes(1);
        expect(result.belt).toBe("WHITE");
        expect(result.name).toBe("Lucas");
        expect(result.email).toBe("lucas@gmail.com");
        expect(result.userId).toBe("user-123");
    });
    it("creates a student with specified belt", async () => {
        const useCase = new RegisterStudentUseCase(mockStudentRepo);
        const studentData = {
            name: "Ana",
            email: "ana@gmail.com",
            userId: "user-456",
            birthDate: new Date("2012-05-05"),
            belt: "GREEN",
        };
        const result = await useCase.execute(studentData);
        expect(result.belt).toBe("GREEN");
    });
});
