import type { Payment } from "../entities/Payment.js";

export interface IPaymentRepository {
  create(payment: Payment): Promise<Payment>;
  findById(id: string): Promise<Payment | null>;
  findByStudentId(studentId: string): Promise<Payment[]>;
  getAll(): Promise<Payment[]>;
  delete(id: string): Promise<void>;
}
