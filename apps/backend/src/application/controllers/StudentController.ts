import type { Request, Response } from "express";
import { MongoStudentRepository } from "../../infrastructure/repositories/MongoStudentRepository.js";
import {
  RegisterStudentUseCase,
  GetStudentsUseCase,
  GetStudentByIdUseCase,
  UpdateStudentUseCase,
  DeleteStudentUseCase
} from "../../../../../domain/dist/use-cases/index.js";

const studentRepo = new MongoStudentRepository();

export class StudentController {
  static async registerStudent(req: Request, res: Response) {
    try {
      const { name, email, userId, birthDate, belt, phone } = req.body;
      const useCase = new RegisterStudentUseCase(studentRepo);
      const student = await useCase.execute({ name, email, userId, birthDate, belt, phone });
      return res.status(201).json(student.toPrimitives());
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  static async getStudents(req: Request, res: Response) {
    try {
      const useCase = new GetStudentsUseCase(studentRepo);
      const students = await useCase.execute();
      return res.json(students.map(s => s.toPrimitives()));
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async getStudentById(req: Request, res: Response) {
    try {
      const { studentId } = req.params;
      const useCase = new GetStudentByIdUseCase(studentRepo);
      const student = await useCase.execute(studentId);
      if (!student) return res.status(404).json({ message: "Student not found" });
      return res.json(student.toPrimitives());
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async updateStudent(req: Request, res: Response) {
    try {
      const { studentId } = req.params;
      const useCase = new UpdateStudentUseCase(studentRepo);
      const updated = await useCase.execute({ ...req.body, id: studentId });
      return res.json(updated.toPrimitives());
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  static async deleteStudent(req: Request, res: Response) {
    try {
      const { studentId } = req.params;
      const useCase = new DeleteStudentUseCase(studentRepo);
      await useCase.execute(studentId);
      return res.json({ message: "Student deleted successfully" });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }
}
