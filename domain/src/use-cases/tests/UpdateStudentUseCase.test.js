import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { UpdateStudentUseCase } from "../UpdateStudentUseCase.js";
import { Student } from "../../entities/students/Student.js";
import { mockStudentRepo } from "../../use-cases/tests/mocks/MockStudentRepository.js";
describe("UpdateStudentUseCase", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });
    afterEach(() => {
        vi.resetAllMocks();
    });
    it("should call repository.update and return the updated student", async () => {
        const useCase = new UpdateStudentUseCase(mockStudentRepo);
        const existingStudent = new Student("s1", "Vanesa", "vanesa@gmail.com", "u1", new Date("2000-01-01"), "WHITE");
        // Simulamos cambio de datos
        existingStudent.name = "Vanesa Actualizada";
        mockStudentRepo.update.mockResolvedValue(existingStudent);
        const updated = await useCase.execute(existingStudent);
        expect(mockStudentRepo.update).toHaveBeenCalledTimes(1);
        expect(mockStudentRepo.update).toHaveBeenCalledWith(existingStudent);
        expect(updated.name).toBe("Vanesa Actualizada");
        expect(updated).toBeInstanceOf(Student);
    });
    it("should throw an error if repository.update fails", async () => {
        const useCase = new UpdateStudentUseCase(mockStudentRepo);
        const student = new Student("s2", "Juan", "juan@gmail.com", "u2", new Date("2001-02-02"), "WHITE");
        mockStudentRepo.update.mockRejectedValue(new Error("DB error"));
        await expect(useCase.execute(student)).rejects.toThrow("DB error");
    });
});
