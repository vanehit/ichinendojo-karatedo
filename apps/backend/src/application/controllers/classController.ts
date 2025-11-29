import type { Request, Response } from "express";
import { MongoClassRepository } from "../../infrastructure/repositories/MongoClassRepository.js";
import { CreateClassUseCase } from "../../../../../domain/dist/use-cases/classes/CreateClassUseCase.js";
import { GetAllClassesUseCase } from "../../../../../domain/dist/use-cases/classes/GetAllClassesUseCase.js";
import { GetClassesByTeacherUseCase } from "../../../../../domain/dist/use-cases/classes/GetClassesByTeacherUseCase.js";

const classRepo = new MongoClassRepository();

export class ClassController {
  static async create(req: Request, res: Response) {
    try {
      const useCase = new CreateClassUseCase(classRepo);
      const newClass = await useCase.execute(req.body);
      res.status(201).json(newClass.toPrimitives());
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  static async getAll(req: Request, res: Response) {
    try {
      const useCase = new GetAllClassesUseCase(classRepo);
      const classes = await useCase.execute();
      res.json(classes.map(c => c.toPrimitives()));
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getByTeacher(req: Request, res: Response) {
    try {
      const { teacherId } = req.params;
      if (!teacherId) {
        return res.status(400).json({ message: "teacherId is required" });
      }
      const useCase = new GetClassesByTeacherUseCase(classRepo);
      const classes = await useCase.execute(teacherId);
      res.json(classes.map(c => c.toPrimitives()));
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}
