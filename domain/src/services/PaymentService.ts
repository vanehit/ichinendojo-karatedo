import { Payment } from "../entities/Payment.js";

export class PaymentService {
  static calculateDebt(payments: Payment[]): number {
    return payments
      .filter(p => p.status === "PENDING" || p.status === "LATE")
      .reduce((acc, p) => acc + p.amount, 0);
  }
}
