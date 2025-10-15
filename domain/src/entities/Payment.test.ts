import { describe, it, expect } from "vitest";
import { Payment, type PaymentStatus } from "./Payment.js";

describe("Payment Entity", () => {
  it("should create a payment with correct properties", () => {
    const payment = new Payment(
      "pay1",
      "sId1",
      100,
      new Date("2025-10-01"),
      "PENDING",
      10,
      2025
    );

    expect(payment.id).toBe("pay1");
    expect(payment.studentId).toBe("sId1");
    expect(payment.amount).toBe(100);
    expect(payment.date).toEqual(new Date("2025-10-01"));
    expect(payment.status).toBe("PENDING");
    expect(payment.month).toBe(10);
    expect(payment.year).toBe(2025);
    expect(payment.createdAt).toBeInstanceOf(Date);
  });

  it("should throw error for invalid status, month or amount", () => {
    expect(
      () => new Payment("pId2", "sId2", 100, new Date(), "INVALID" as PaymentStatus, 10, 2025)
    ).toThrowError("Invalid payment status: INVALID");

    expect(
      () => new Payment("pId3", "sId3", 100, new Date(), "PAID", 0, 2025)
    ).toThrowError("Invalid month: 0");

    expect(
      () => new Payment("pId4", "sId4", -50, new Date(), "PAID", 5, 2025)
    ).toThrowError("Invalid amount: -50");
  });

  it("should allow updating status", () => {
    const payment = new Payment("pId5", "sId5", 200, new Date(), "PENDING", 9, 2025);
    payment.updateStatus("PAID");
    expect(payment.status).toBe("PAID");
  });
});
