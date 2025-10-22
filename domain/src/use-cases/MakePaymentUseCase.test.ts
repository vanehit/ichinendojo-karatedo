import { describe, it, expect } from "vitest";
import { Student } from "../entities/Student.js";
import { Payment } from "../entities/Payment.js";
import { MakePaymentUseCase } from "./MakePaymentUseCase.js";

describe("MakePaymentUseCase", () => {
  it("Adds a payment to the student.", () => {
    const student = new Student("1", "uId1", new Date("2010-05-01"), "WHITE");
    const payment = new Payment("payId1", student.id, 1000, new Date(), "PENDING", 9, 2025);

    const useCase = new MakePaymentUseCase();
    const updatedStudent = useCase.execute(student, payment);
   
    expect(updatedStudent.payments).toHaveLength(1);
    expect(updatedStudent.payments[0].amount).toBe(1000);
    expect(updatedStudent.payments[0].status).toBe("PENDING");
  });

  it("Throws an error if the payment does not belong to the student.", () => {
    const student = new Student("1", "uId1", new Date("2010-05-01"), "WHITE");
    // This payment points to a different studentId.
    const payment = new Payment("payId2", "other-student", 1500, new Date(), "PAID", 9, 2025);

    const useCase = new MakePaymentUseCase();

    expect(() => useCase.execute(student, payment)).toThrowError(
      "Payment studentId does not match this student"
    );
  });
});
