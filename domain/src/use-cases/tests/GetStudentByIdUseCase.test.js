import { describe, it, expect, beforeEach, vi } from "vitest";
import { GetStudentByIdUseCase } from "../../use-cases/GetStudentByIdUseCase.js";
import { Student } from "../../entities/students/Student.js";
import { mockStudentRepo } from "./mocks/MockStudentRepository.js";
describe("GetStudentByIdUseCase", () => {
    beforeEach(() => {
        vi.clearAllMocks(); // limpia todos los mocks antes de cada test
    });
    it("should return a student if found by id", async () => {
        const useCase = new GetStudentByIdUseCase(mockStudentRepo);
        const student = new Student("s1", "Vanesa", "vane@gmail.com", "u1", new Date("2000-01-01"), "WHITE");
        mockStudentRepo.findById.mockResolvedValue(student);
        const result = await useCase.execute("s1");
        expect(mockStudentRepo.findById).toHaveBeenCalledWith("s1");
        expect(result).toBeInstanceOf(Student);
        expect(result?.name).toBe("Vanesa");
    });
    it("should return null if student is not found", async () => {
        const useCase = new GetStudentByIdUseCase(mockStudentRepo);
        mockStudentRepo.findById.mockResolvedValue(null);
        const result = await useCase.execute("unknown-id");
        expect(mockStudentRepo.findById).toHaveBeenCalledWith("unknown-id");
        expect(result).toBeNull();
    });
    it("should throw an error if repository fails", async () => {
        const useCase = new GetStudentByIdUseCase(mockStudentRepo);
        mockStudentRepo.findById.mockRejectedValue(new Error("DB error"));
        await expect(useCase.execute("s1")).rejects.toThrow("DB error");
    });
});
