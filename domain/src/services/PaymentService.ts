import type { Payment } from "../entities/Payment.js";
import type { IPaymentRepository } from "../repositories/IPaymentRepository.js";
import type { IStudentRepository } from "../repositories/IStudentRepository.js";

export class MakePaymentUseCase {
  constructor(
    private studentRepo: IStudentRepository,
    private paymentRepo: IPaymentRepository
  ) {}

  async execute(payment: Payment): Promise<Payment> {
    const student = await this.studentRepo.findById(payment.studentId);
    if (!student) throw new Error("Student not found");

    student.addPayment(payment); 
    await this.studentRepo.update(student);

    return this.paymentRepo.create(payment);
  }
}
