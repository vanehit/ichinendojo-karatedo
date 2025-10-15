import { describe, it, expect } from "vitest";
import { Student } from "../entities/Student.js";
import { Payment } from "../entities/Payment.js";
import { PaymentService } from "../services/PaymentService.js";

describe("PaymentService", () => {
  it("Returns 0 if the student has no payments.", () => {
    const student = new Student("1", "uId1", new Date(), "WHITE");

    const debt = PaymentService.calculateDebt(student);
    expect(debt).toBe(0);
  });

  it("Sums the pending or overdue payments.", () => {
    const student = new Student("1", "uId1", new Date(), "WHITE");

    const pId1 = new Payment("pId1", student.id, 1000, new Date(), "PENDING", 9, 2025);
    const pId2 = new Payment("pId2", student.id, 1200, new Date(), "LATE", 8, 2025);

    student.addPayment(pId1);
    student.addPayment(pId2);

    const debt = PaymentService.calculateDebt(student);
    expect(debt).toBe(2200);
  });

  it("Ignores payments that are in PAID status.", () => {
    const student = new Student("1", "uId1", new Date(), "WHITE");

    const pId1 = new Payment("pId1", student.id, 1000, new Date(), "PENDING", 9, 2025);
    const pId2 = new Payment("pId2", student.id, 1500, new Date(), "PAID", 7, 2025);

    student.addPayment(pId1);
    student.addPayment(pId2);

    const debt = PaymentService.calculateDebt(student);
    expect(debt).toBe(1000); 
  });
});
