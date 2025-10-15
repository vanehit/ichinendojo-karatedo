import { Payment } from "../entities/Payment.js";
import { Student } from "../entities/Student.js";

export class MakePaymentUseCase {
  execute(student: Student, payment: Payment): Student {
    if (payment.studentId !== student.id) {
      throw new Error("Payment studentId does not match this student");
    }

    student.addPayment(payment);
    return student;
  }
}
