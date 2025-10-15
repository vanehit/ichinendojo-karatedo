import { describe, it, expect } from "vitest";
import { RegisterStudentUseCase } from "./RegisterStudentUseCase.js";
import { Student } from "../entities/Student.js";

describe("RegisterStudentUseCase", () => {
  it("Creates a student with a default belt (WHITE) if none is specified.", () => {
    const useCase = new RegisterStudentUseCase();
    const student = useCase.execute({
      id: "1",
      userId: "uId1",
      birthDate: new Date("2010-05-01"),
    });

    expect(student).toBeInstanceOf(Student);
    expect(student.belt).toBe("WHITE");
    expect(student.userId).toBe("uId1");
  });

  it("Creates a student with the specified belt.", () => {
    const useCase = new RegisterStudentUseCase();
    const student = useCase.execute({
      id: "2",
      userId: "uId2",
      birthDate: new Date("2012-03-15"),
      belt: "YELLOW",
    });

    expect(student.belt).toBe("YELLOW");
  });

  it("Correctly assigns the birth date and other data.", () => {
    const useCase = new RegisterStudentUseCase();
    const birthDate = new Date("2011-07-20");
    const student = useCase.execute({
      id: "3",
      userId: "uId3",
      birthDate,
      phone: "123456789",
    });

    expect(student.birthDate).toEqual(birthDate);
    expect(student.phone).toBe("123456789");
  });
});
