import { Router } from "express";
import { StudentController } from "../controllers/StudentController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

export const studentsRouter = Router();

// Solo ADMIN puede crear, actualizar o borrar
studentsRouter.post("/", authMiddleware(["ADMIN"]), StudentController.registerStudent);
studentsRouter.put("/:studentId", authMiddleware(["ADMIN"]), StudentController.updateStudent);
studentsRouter.delete("/:studentId", authMiddleware(["ADMIN"]), StudentController.deleteStudent);

// Todos los usuarios autenticados pueden leer
studentsRouter.get("/", authMiddleware(), StudentController.getStudents);
studentsRouter.get("/:studentId", authMiddleware(), StudentController.getStudentById);
