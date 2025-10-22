import { Payment } from "../../../../../domain/src/entities/Payment";
import { PaymentModel } from "../../infrastructure/database/models/Payment";


export class PaymentRepository {
  async create(data: Partial<Payment>): Promise<Payment> {
    const payment = new PaymentModel(data);
    return await payment.save() as unknown as Payment;
  }

  async findById(id: string): Promise<Payment | null> {
    const payment = await PaymentModel.findById(id);
    return payment as unknown as Payment | null;
  }

  async getAll(): Promise<Payment[]> {
    const payments = await PaymentModel.find();
    return payments as unknown as Payment[];
  }

  async findByStudentId(studentId: string): Promise<Payment[]> {
    const payments = await PaymentModel.find({ studentId });
    return payments as unknown as Payment[];
  }

  async delete(id: string): Promise<void> {
    await PaymentModel.findByIdAndDelete(id);
  }
}
