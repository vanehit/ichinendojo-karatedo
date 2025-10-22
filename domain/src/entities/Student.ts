import { isValidBeltLevel, type BeltLevel } from "./BeltLevel.js";
import type { Payment } from "./Payment.js";
import type { Promotion } from "./Promotion.js";




export class Student {
  public promotions: Promotion[] = [];
  public payments: Payment[] = [];
  public createdAt: Date;

  constructor(
    public id: string,
    public userId: string,
    public birthDate: Date,
    public belt: BeltLevel,
    public phone?: string
  ) {
    this.validateBelt(belt);
    this.createdAt = new Date();
  }

   private validateBelt(belt: BeltLevel) {
    if (!isValidBeltLevel(belt)) {
      throw new Error(`Invalid belt level: ${belt}`);
    }
  }

  addPromotion(promotion: Promotion) {
    if (promotion.studentId !== this.id) {
      throw new Error("Promotion studentId does not match this student");
    }
    this.promotions.push(promotion);
  }

  addPayment(payment: Payment) {
    if (payment.studentId !== this.id) {
      throw new Error("Payment studentId does not match this student");
    }
    this.payments.push(payment);
  }
}
