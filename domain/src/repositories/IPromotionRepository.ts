import { Promotion } from "../entities/Promotion.js";

export interface IPromotionRepository {
  create(promotion: Promotion): Promise<Promotion>;
  findById(id: string): Promise<Promotion | null>;
  findByStudentId(studentId: string): Promise<Promotion[]>;
  getAll(): Promise<Promotion[]>;
  delete(id: string): Promise<void>;
}
