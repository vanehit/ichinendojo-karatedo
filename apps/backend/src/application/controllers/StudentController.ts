// src/application/controllers/StudentController.ts
import type { Request, Response } from "express";
import { MongoStudentRepository } from "../../infrastructure/repositories/MongoStudentRepository.js";
import {
  RegisterStudentUseCase,
  GetStudentsUseCase,
  GetStudentByIdUseCase,
  UpdateStudentUseCase,
  DeleteStudentUseCase,
} from "../../../../../domain/src/use-cases/index.js";

const studentRepo = new MongoStudentRepository();

export class StudentController {
  static async register(req: Request, res: Response) {
    try {
      const { name, email, userId, birthDate, belt, phone } = req.body;

      if (!name || !email || !userId || !birthDate) {
        return res
          .status(400)
          .json({ message: "name, email, userId y birthDate son requeridos" });
      }

      const useCase = new RegisterStudentUseCase(studentRepo);
      const student = await useCase.execute({ name, email, userId, birthDate, belt, phone });

      res.status(201).json(student);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  static async getStudents(req: Request, res: Response) {
    try {
      const useCase = new GetStudentsUseCase(studentRepo);
      const students = await useCase.execute();
      res.json(students);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getStudentById(req: Request, res: Response) {
    try {
      const { studentId } = req.params;
      if (!studentId)
        return res.status(400).json({ message: "Student id is required" });

      const useCase = new GetStudentByIdUseCase(studentRepo);
      const student = await useCase.execute(studentId);

      if (!student) return res.status(404).json({ message: "Student not found" });
      res.json(student);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async updateStudent(req: Request, res: Response) {
    try {
      const { studentId } = req.params;
      if (!studentId)
        return res.status(400).json({ message: "Student id is required" });

      const useCase = new UpdateStudentUseCase(studentRepo);
      const updated = await useCase.execute({ ...req.body, id: studentId });

      res.json(updated);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  static async deleteStudent(req: Request, res: Response) {
    try {
      const { studentId } = req.params;
      if (!studentId)
        return res.status(400).json({ message: "Student id is required" });

      const useCase = new DeleteStudentUseCase(studentRepo);
      await useCase.execute(studentId);

      res.json({ message: "Student deleted successfully" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}
