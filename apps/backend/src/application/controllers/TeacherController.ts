import type { Request, Response } from "express";
import { MongoStudentRepository } from "../../infrastructure/repositories/MongoStudentRepository.js";
import { MongoFollowUpRepository } from "../../infrastructure/repositories/MongoFollowUpRepository.js";
import { MongoClassRepository } from "../../infrastructure/repositories/MongoClassRepository.js";

import { GetAssignedStudentsUseCase } from "../../../../../domain/dist/use-cases/teachers/GetAssignedStudentsUseCase.js";
import { CreateFollowUpUseCase } from "../../../../../domain/dist/use-cases/teachers/CreateFollowUpUseCase.js";
import { GetFollowUpsByStudentUseCase } from "../../../../../domain/dist/use-cases/teachers/GetFollowUpsByStudentUseCase.js";
import { GetMyClassesUseCase } from "../../../../../domain/dist/use-cases/teachers/GetMyClassesUseCase.js";

export class TeacherController {
  static async addFollowUp(req: Request, res: Response) {
  try {
    const teacherId = (req as any).user.id;
    const { studentId } = req.params;
    const { comment, progress } = req.body;

    if (!teacherId) {
      return res.status(400).json({ message: "teacherId is required" });
    }
    if (!studentId) {
      return res.status(400).json({ message: "studentId is required" });
    }

    const useCase = new CreateFollowUpUseCase(new MongoFollowUpRepository());
    const result = await useCase.execute({ teacherId, studentId, comment, progress });
    res.status(201).json(result);
  } catch (error: any) {
    res.status(400).json({ message: error.message || "Error al crear el seguimiento." });
  }
}

static async getFollowUps(req: Request, res: Response) {
  try {
    const { studentId } = req.params;

    if (!studentId) {
      return res.status(400).json({ message: "studentId is required" });
    }

    const useCase = new GetFollowUpsByStudentUseCase(new MongoFollowUpRepository());
    const result = await useCase.execute(studentId);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message || "Error al obtener los seguimientos." });
  }
}

static async getAssignedStudents(req: Request, res: Response) {
  try {
    const teacherId = (req as any).user.id;

    if (!teacherId) {
      return res.status(400).json({ message: "teacherId is required" });
    }

    const useCase = new GetAssignedStudentsUseCase(new MongoStudentRepository());
    const result = await useCase.execute(teacherId);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message || "Error al obtener los alumnos." });
  }
}

static async getMyClasses(req: Request, res: Response) {
  try {
    const teacherId = (req as any).user.id;

    if (!teacherId) {
      return res.status(400).json({ message: "teacherId is required" });
    }

    const useCase = new GetMyClassesUseCase(new MongoClassRepository());
    const result = await useCase.execute(teacherId);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message || "Error al obtener las clases." });
  }
}

}
