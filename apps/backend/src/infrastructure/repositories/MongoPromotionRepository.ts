import { Promotion } from "../../../../../domain/src/entities/Promotion.js";
import type { IPromotionRepository } from "../../../../../domain/src/repositories/IPromotionRepository.js";
import { PromotionModel } from "../database/models/Promotion.js";

export class MongoPromotionRepository implements IPromotionRepository {

  private mapToDomain(doc: any): Promotion {
    const promotion = new Promotion(
      doc.studentId,
      doc.oldBelt,
      doc.newBelt,
      doc.examDate
    );
    if (doc.approved) promotion.approve();
    return promotion;
  }

  async create(promotion: Promotion): Promise<Promotion> {
    const saved = await new PromotionModel({
      studentId: promotion.studentId,
      oldBelt: promotion.oldBelt,
      newBelt: promotion.newBelt,
      examDate: promotion.examDate,
      approved: promotion.approved,
    }).save();
    return this.mapToDomain(saved);
  }

  async findById(id: string): Promise<Promotion | null> {
    const doc = await PromotionModel.findById(id);
    return doc ? this.mapToDomain(doc) : null;
  }

  async findByStudentId(studentId: string): Promise<Promotion[]> {
    const docs = await PromotionModel.find({ studentId });
    return docs.map(this.mapToDomain);
  }

  async getAll(): Promise<Promotion[]> {
    const docs = await PromotionModel.find();
    return docs.map(this.mapToDomain);
  }

  async delete(id: string): Promise<void> {
    await PromotionModel.findByIdAndDelete(id);
  }
}
