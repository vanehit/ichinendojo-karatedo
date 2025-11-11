import { Router } from "express";
import { ClassController } from "../controllers/classController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

export const classRouter = Router();

// Solo TEACHER o ADMIN pueden crear o ver clases
classRouter.use(authMiddleware(["TEACHER", "ADMIN"]));

// Crear clase
classRouter.post("/", ClassController.create);

// Obtener todas las clases
classRouter.get("/", ClassController.getAll);

// Obtener clases por profesor
classRouter.get("/teacher/:teacherId", ClassController.getByTeacher);
