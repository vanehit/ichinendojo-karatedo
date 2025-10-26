import { MakePaymentUseCase } from "../../../../../domain/src/use-cases/MakePaymentUseCase.js";
import { GetPaymentsUseCase } from "../../../../../domain/src/use-cases/GetPaymentsUseCase.js";
import type { Request, Response } from "express";
import { MongoStudentRepository } from "../../infrastructure/repositories/MongoStudentRepository.js";
import { MongoPaymentRepository } from "../../infrastructure/repositories/MongoPaymentRepository.js";
import { Payment } from "../../../../../domain/src/entities/Payment.js";
import crypto from "crypto";

const studentRepo = new MongoStudentRepository();
const paymentRepo = new MongoPaymentRepository();

const makePaymentUseCase = new MakePaymentUseCase(studentRepo, paymentRepo);
const getPaymentsUseCase = new GetPaymentsUseCase(paymentRepo);

export class PaymentController {
  static async makePayment(req: Request, res: Response) {
    try {
      const { studentId } = req.params;
      const { amount, date, month, year } = req.body;

      if (!amount || !date || !month || !year) {
        return res.status(400).json({ message: "amount, date, month y year son requeridos" });
      }

      const payment = new Payment(
        crypto.randomUUID(),
        studentId!,
        amount,
        new Date(date),
        "PAID",
        month,
        year
      );

      const result = await makePaymentUseCase.execute(payment);
      res.status(201).json(result);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }

  static async getPayments(req: Request, res: Response) {
    try {
      const { studentId } = req.params;
      const payments = await getPaymentsUseCase.execute(studentId!);
      res.json(payments);
    } catch (err: any) {
      res.status(500).json({ message: "Error getting payments" });
    }
  }
}
