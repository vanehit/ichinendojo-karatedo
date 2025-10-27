import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { RegisterStudentUseCase } from "../students/RegisterStudentUseCase.js";
import { Student } from "../../entities/students/Student.js";
import { mockStudentRepo } from "../tests/mocks/MockStudentRepository.js";

describe("RegisterStudentUseCase", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it("creates a student with default belt WHITE if none is specified", async () => {
    const useCase = new RegisterStudentUseCase(mockStudentRepo);

    const student = await useCase.execute({
      name: "Vanesa",
      email: "vanesa@gmail.com",
      birthDate: "2010-05-01",
      userId: "uId1",
    });

    expect(student).toBeInstanceOf(Student);
    expect(student.belt).toBe("WHITE");
    expect(student.userId).toBe("uId1");
    expect(mockStudentRepo.create).toHaveBeenCalledTimes(1);
  });

  it("creates a student with the specified belt", async () => {
    const useCase = new RegisterStudentUseCase(mockStudentRepo);

    const student = await useCase.execute({
      name: "Juan",
      email: "juan@gmail.com",
      birthDate: "2012-03-15",
      userId: "uId2",
      belt: "YELLOW",
    });

    expect(student.belt).toBe("YELLOW");
    expect(mockStudentRepo.create).toHaveBeenCalledTimes(1);
  });

  it("correctly assigns birth date and other data", async () => {
    const useCase = new RegisterStudentUseCase(mockStudentRepo);
    const birthDate = "2011-07-20";

    const student = await useCase.execute({
      name: "Ana",
      email: "ana@gmail.com",
      birthDate,
      userId: "uId3",
      phone: "123456789",
    });

    expect(student.birthDate instanceof Date).toBe(true);
    expect(student.birthDate.toISOString()).toBe(new Date(birthDate).toISOString());
    expect(student.phone).toBe("123456789");
  });
});
