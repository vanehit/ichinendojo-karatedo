import { PaymentModel } from "../database/models/Payment.js";
import { Payment } from "../../../../../domain/src/entities/Payment.js";
import type { IPaymentRepository } from "../../../../../domain/src/repositories/IPaymentRepository.js";

export class MongoPaymentRepository implements IPaymentRepository {

  private toDomain(doc: any): Payment {
    return new Payment(
      doc.id.toString(),
      doc.studentId,
      doc.amount,
      doc.date,
      doc.status,
      doc.month,
      doc.year
    );
  }

  async create(payment: Payment): Promise<Payment> {
    const saved = await new PaymentModel(payment).save();
    return this.toDomain(saved);
  }

  async findById(id: string): Promise<Payment | null> {
    const doc = await PaymentModel.findById(id);
    return doc ? this.toDomain(doc) : null;
  }

  async findByStudentId(studentId: string): Promise<Payment[]> {
    const docs = await PaymentModel.find({ studentId });
    return docs.map(d => this.toDomain(d));
  }

  async getAll(): Promise<Payment[]> {
    const docs = await PaymentModel.find();
    return docs.map(d => this.toDomain(d));
  }

  async delete(id: string): Promise<void> {
    await PaymentModel.findByIdAndDelete(id);
  }
}
