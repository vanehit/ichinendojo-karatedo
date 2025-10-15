import { describe, it, expect } from "vitest";
import { Student } from "./Student.js";
import { Promotion } from "./Promotion.js";
import { Payment } from "./Payment.js";
import { type BeltLevel } from "./BeltLevel.js";


describe("Student Entity", () => {
  it("should create a student with correct properties", () => {
    const student = new Student("sId1", "uId1", new Date("2000-01-01"), "WHITE", "123456789");

    expect(student.id).toBe("sId1");
    expect(student.userId).toBe("uId1");
    expect(student.birthDate).toEqual(new Date("2000-01-01"));
    expect(student.belt).toBe("WHITE");
    expect(student.phone).toBe("123456789");
    expect(student.promotions).toEqual([]);
    expect(student.payments).toEqual([]);
    expect(student.createdAt).toBeInstanceOf(Date);
  });

 it("should throw error when creating a student with invalid belt", () => {
    expect(() => 
      new Student("sId2", "uId2", new Date("2000-01-01"), "PINK" as BeltLevel)
    ).toThrowError("Invalid belt level: PINK");
  });

  it("should add a valid promotion", () => {
    const student = new Student("sId1", "uId1", new Date("2000-01-01"), "WHITE");
    const promotion = new Promotion("pId1", "sId1", "WHITE", "YELLOW", new Date("2025-10-01"));
    
    student.addPromotion(promotion);

    expect(student.promotions).toContain(promotion);
  });

  it("should throw error if promotion studentId does not match", () => {
    const student = new Student("sId1", "uId1", new Date("2000-01-01"), "WHITE");
    const promotion = new Promotion("pId2", "sId2", "WHITE", "YELLOW", new Date("2025-10-01"));
    
    expect(() => student.addPromotion(promotion)).toThrowError(
      "Promotion studentId does not match this student"
    );
  });

  it("should add a valid payment", () => {
    const student = new Student("sId1", "uId1", new Date("2000-01-01"), "WHITE");
    const payment = new Payment("payId1", "sId1", 100, new Date("2025-10-01"), "PENDING", 10, 2025);

    student.addPayment(payment);

    expect(student.payments).toContain(payment);
  });

  it("should throw error if payment studentId does not match", () => {
    const student = new Student("sId1", "uId1", new Date("2000-01-01"), "WHITE");
    const payment = new Payment("payId2", "sId2", 100, new Date("2025-10-01"), "PENDING", 10, 2025);

    expect(() => student.addPayment(payment)).toThrowError(
      "Payment studentId does not match this student"
    );
  });

});
