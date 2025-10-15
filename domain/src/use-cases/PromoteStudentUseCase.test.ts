import { describe, it, expect } from "vitest";
import { Student } from "../entities/Student.js";
import { Promotion } from "../entities/Promotion.js";
import { PromoteStudentUseCase } from "./PromoteStudentUseCase.js";

describe("PromoteStudentUseCase", () => {
  it("Correctly promotes the student.", () => {
    const student = new Student("1", "uId1", new Date(), "WHITE");
    const promotion = new Promotion("pId1", student.id, "WHITE", "YELLOW", new Date());

    const useCase = new PromoteStudentUseCase();
    const updatedStudent = useCase.execute(student, promotion);

    expect(updatedStudent.belt).toBe("YELLOW");
    expect(updatedStudent.promotions).toHaveLength(1);
  });

  it("Throws an error if the belt does not match.", () => {
    const student = new Student("1", "uId1", new Date(), "WHITE");
    const promotion = new Promotion("pId1", student.id, "BLUE", "BROWN", new Date());

    const useCase = new PromoteStudentUseCase();
    expect(() => useCase.execute(student, promotion)).toThrowError();
  });
});
