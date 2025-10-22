import { Promotion } from "../../../../../domain/src/entities/Promotion";
import { PromotionModel } from "../../infrastructure/database/models/Promotion";

export class PromotionRepository {
  async create(data: Partial<Promotion>): Promise<Promotion> {
    const promotion = new PromotionModel(data);
    return await promotion.save() as unknown as Promotion;
  }

  async findById(id: string): Promise<Promotion | null> {
    const promotion = await PromotionModel.findById(id);
    return promotion as unknown as Promotion | null;
  }

  async getAll(): Promise<Promotion[]> {
    const promotions = await PromotionModel.find();
    return promotions as unknown as Promotion[];
  }

  async findByStudentId(studentId: string): Promise<Promotion[]> {
    const promotions = await PromotionModel.find({ studentId });
    return promotions as unknown as Promotion[];
  }

  async delete(id: string): Promise<void> {
    await PromotionModel.findByIdAndDelete(id);
  }
}
