import { Student } from "../entities/Student.js";

export class PaymentService {
  static calculateDebt(student: Student): number {
    return student.payments
      .filter(p => p.status !== "PAID")
      .reduce((sum, p) => sum + p.amount, 0);
  }
}
