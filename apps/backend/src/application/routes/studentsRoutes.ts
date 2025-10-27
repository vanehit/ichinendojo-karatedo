// src/application/routes/studentRoutes.ts
import { Router } from "express";
import { StudentController } from "../controllers/StudentController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

export const studentsRouter = Router();

studentsRouter.use(authMiddleware());

studentsRouter.get("/", StudentController.getStudents);

studentsRouter.post("/", StudentController.registerStudent);

studentsRouter.get("/:studentId", StudentController.getStudentById);

studentsRouter.put("/:studentId", StudentController.updateStudent);

studentsRouter.delete("/:studentId", StudentController.deleteStudent);
