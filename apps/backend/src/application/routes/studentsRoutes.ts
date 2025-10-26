import { Router } from "express";
import { StudentController } from "../controllers/StudentController.js";

export const studentRouter = Router();

studentRouter.get("/", StudentController.getStudents);
studentRouter.post("/", StudentController.register);

// Operaciones sobre un estudiante específico
studentRouter.get("/:studentId", StudentController.getStudentById);
studentRouter.put("/:studentId", StudentController.updateStudent);
studentRouter.delete("/:studentId", StudentController.deleteStudent);
