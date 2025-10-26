import { StudentModel } from "../../infrastructure/database/models/Student.js";
import { MongoPromotionRepository } from "../../infrastructure/repositories/MongoPromotionRepository.js";
import { Promotion } from "../../../../../domain/src/entities/Promotion.js";
import type { Request, Response } from "express";

const promotionRepository = new MongoPromotionRepository();

export class PromotionController {
  static async promoteStudent(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { oldBelt, newBelt, examDate } = req.body;

      const student = await StudentModel.findById(id);
      if (!student) return res.status(404).json({ message: "Student not found" });

      const promotion = new Promotion(student.id.toString(), oldBelt, newBelt, new Date(examDate));

      const savedPromotion = await promotionRepository.create(promotion);

      student.belt = newBelt;
      await student.save();

      return res.status(201).json(savedPromotion);
    } catch (err) {
      console.error("Error promoting student:", err);
      return res.status(500).json({ message: "Error promoting student" });
    }
  }

  static async getPromotions(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ message: "Missing student ID" });

      const promotions = await promotionRepository.findByStudentId(id);
      res.json(promotions);
    } catch (err) {
      console.error("Error getting promotions:", err);
      res.status(500).json({ message: "Error getting promotions" });
    }
  }
}
