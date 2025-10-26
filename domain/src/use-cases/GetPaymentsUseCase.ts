import type { Payment } from "../entities/Payment.js";
import type { IPaymentRepository } from "../repositories/IPaymentRepository.js";

export class GetPaymentsUseCase {
  constructor(private paymentRepo: IPaymentRepository) {}

  async execute(studentId: string): Promise<Payment[]> {
    return this.paymentRepo.findByStudentId(studentId);
  }
}
