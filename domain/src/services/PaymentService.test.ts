import { describe, it, expect } from "vitest";
import { Payment } from "../entities/Payment.js";
import { PaymentService } from "./PaymentService.js";

describe("PaymentService", () => {
  it("returns 0 if no payments are provided", () => {
    const payments: Payment[] = [];
    const debt = PaymentService.calculateDebt(payments);
    expect(debt).toBe(0);
  });

  it("sums pending and late payments", () => {
    const payments: Payment[] = [
      new Payment("p1", "s1", 1000, new Date(), "PENDING", 9, 2025),
      new Payment("p2", "s1", 1200, new Date(), "LATE", 8, 2025)
    ];

    const debt = PaymentService.calculateDebt(payments);
    expect(debt).toBe(2200);
  });

  it("ignores PAID payments", () => {
    const payments: Payment[] = [
      new Payment("p1", "s1", 1000, new Date(), "PENDING", 9, 2025),
      new Payment("p2", "s1", 1500, new Date(), "PAID", 7, 2025)
    ];

    const debt = PaymentService.calculateDebt(payments);
    expect(debt).toBe(1000);
  });
});
