import { Request, Response } from "express";
import { StudentModel } from "../../infrastructure/database/models/Student";
import { PromotionRepository } from "../repositories/PromotionRepository";

const promotionRepository = new PromotionRepository();

export class PromotionController {

  // Crear una nueva promoción para un estudiante
  static async promoteStudent(req: Request, res: Response) {
    try {
      const { id } = req.params; // id del estudiante
      const { oldBelt, newBelt, examDate } = req.body;

      const student = await StudentModel.findById(id);
      if (!student) {
        return res.status(404).json({ message: "Student not found" });
      }

      const promotion = await promotionRepository.create({
        studentId: student.id.toString(),
        oldBelt,
        newBelt,
        examDate,
      });

      student.belt = newBelt;
      await student.save();

      return res.status(201).json(promotion);
    } catch (err) {
      console.error("Error promoting student:", err);
      return res.status(500).json({ message: "Error promoting student" });
    }
  }

  // Obtener todas las promociones de un estudiante
  static async getPromotions(req: Request, res: Response) {
    try {
      const { id } = req.params; // id del estudiante
      const promotions = await promotionRepository.findByStudentId(id);
      res.json(promotions);
    } catch (err) {
      console.error("Error getting promotions:", err);
      res.status(500).json({ message: "Error getting promotions" });
    }
  }
}
