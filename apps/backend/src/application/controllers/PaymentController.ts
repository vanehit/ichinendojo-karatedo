import { Request, Response } from "express";
import { StudentModel } from "../../infrastructure/database/models/Student";
import { PaymentRepository } from "../repositories/PaymentRepository";

const paymentRepository = new PaymentRepository();

export class PaymentController {
  static async makePayment(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { amount, date } = req.body;

      // Verificar si el estudiante existe
      const student = await StudentModel.findById(id);
      if (!student) {
        return res.status(404).json({ message: "Student not found" });
      }

      // Crear el pago usando el repositorio
      const payment = await paymentRepository.create({
        studentId: student.id.toString(),
        amount,
        date,
        status: "PAID",
      });

      return res.status(201).json(payment);
    } catch (err) {
      console.error("Error adding payment:", err);
      return res.status(500).json({ message: "Error adding payment" });
    }
  }

  // endpoint para obtener pagos por estudiante
  static async getPayments(req: Request, res: Response) {
    try {
      const { id } = req.params; // id del estudiante
      const payments = await paymentRepository.findByStudentId(id);
      res.json(payments);
    } catch (err) {
      console.error("Error getting payments:", err);
      res.status(500).json({ message: "Error getting payments" });
    }
  }
}

