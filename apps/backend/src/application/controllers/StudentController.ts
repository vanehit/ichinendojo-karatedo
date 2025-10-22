import { Request, Response } from "express";
import { StudentRepository } from "../repositories/StudentRespository";


const studentRepository = new StudentRepository();

export class StudentController {
  static async getStudents(req: Request, res: Response) {
    try {
      const students = await studentRepository.getAll();
      res.json(students);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error getting students" });
    }
  }

  static async registerStudent(req: Request, res: Response) {
    try {
      const newStudent = await studentRepository.create(req.body);
      res.status(201).json(newStudent);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error registering student" });
    }
  }
}
