import { isValidBeltLevel, type BeltLevel } from "./BeltLevel.js";
import type { Payment } from "./Payment.js";
import type { Promotion } from "./Promotion.js";

export class Student {
  public promotions: Promotion[] = [];
  public payments: Payment[] = [];
  public createdAt: Date;

  constructor(
    public id: string,
    public name: string,      
    public email: string,      
    public userId: string,
    public birthDate: Date,
    public belt: BeltLevel,
    public phone?: string
  ) {
    this.validateBelt(belt);
    this.validateBirthDate(birthDate);
    this.createdAt = new Date();
  }

  private validateBelt(belt: BeltLevel): void {
    if (!isValidBeltLevel(belt)) {
      throw new Error(`Invalid belt level: ${belt}`);
    }
  }

  private validateBirthDate(birthDate: Date): void {
    if (!(birthDate instanceof Date) || isNaN(birthDate.getTime())) {
      throw new Error("Invalid birth date");
    }
  }

  addPromotion(promotion: Promotion): this {
    if (promotion.studentId !== this.id) {
      throw new Error("Promotion studentId does not match this student");
    }
    this.promotions.push(promotion);
    return this;
  }

  addPayment(payment: Payment): this {
    if (payment.studentId !== this.id) {
      throw new Error("Payment studentId does not match this student");
    }
    this.payments.push(payment);
    return this;
  }
}
