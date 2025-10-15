import { describe, it, expect } from "vitest";
import { Promotion } from "./Promotion.js";
import { type BeltLevel } from "./BeltLevel.js";

describe("Promotion Entity", () => {
  it("should create a promotion with correct properties", () => {
    const promotion = new Promotion(
      "pId1",
      "sId1",
      "WHITE",
      "YELLOW",
      new Date("2025-10-01")
    );

    expect(promotion.id).toBe("pId1");
    expect(promotion.studentId).toBe("sId1");
    expect(promotion.oldBelt).toBe("WHITE");
    expect(promotion.newBelt).toBe("YELLOW");
    expect(promotion.examDate).toEqual(new Date("2025-10-01"));
    expect(promotion.approved).toBe(false);
    expect(promotion.createdAt).toBeInstanceOf(Date);
  });

  it("should allow creating a promotion already approved", () => {
    const promotion = new Promotion(
      "pId2",
      "sId2",
      "ORANGE",
      "GREEN",
      new Date("2025-12-01"),
      true
    );

    expect(promotion.approved).toBe(true);
  });

  it("should throw error for invalid belts", () => {
    expect(
      () => new Promotion("pId3", "sId3", "INVALID" as BeltLevel, "YELLOW", new Date())
    ).toThrowError("Invalid belt level: INVALID");

    expect(
      () => new Promotion("pId4", "sId4", "WHITE", "INVALID" as BeltLevel, new Date())
    ).toThrowError("Invalid belt level: INVALID");
  });

  it("should approve the promotion", () => {
    const promotion = new Promotion("pId5", "sId5", "GREEN", "BLUE", new Date());
    promotion.approve();
    expect(promotion.approved).toBe(true);
  });
});
