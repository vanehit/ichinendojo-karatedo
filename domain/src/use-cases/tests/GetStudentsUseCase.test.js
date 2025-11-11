import { describe, it, expect, vi, beforeEach } from "vitest";
import { GetStudentsUseCase } from "../GetStudentsUseCase.js";
import { Student } from "../../entities/students/Student.js";
import { mockStudentRepo } from "../../use-cases/tests/mocks/MockStudentRepository.js";
describe("GetStudentsUseCase", () => {
    beforeEach(() => vi.clearAllMocks());
    it("should return list of students", async () => {
        const useCase = new GetStudentsUseCase(mockStudentRepo);
        const students = [
            new Student("s1", "Vanesa", "vane@gmail.com", "u1", new Date("2000-01-01"), "WHITE"),
            new Student("s2", "Juan", "juan@gmail.com", "u2", new Date("2001-02-02"), "YELLOW"),
        ];
        mockStudentRepo.getAll.mockResolvedValue(students);
        const result = await useCase.execute();
        expect(mockStudentRepo.getAll).toHaveBeenCalledTimes(1);
        expect(result).toHaveLength(2);
        expect(result[0]).toBeInstanceOf(Student);
        expect(result[0].name).toBe("Vanesa");
        expect(result[1].belt).toBe("YELLOW");
    });
});
