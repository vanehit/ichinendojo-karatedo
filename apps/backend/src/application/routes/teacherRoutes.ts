import { Router } from "express";
import { TeacherController } from "../controllers/TeacherController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

export const teacherRouter = Router();

// Solo TEACHER o ADMIN pueden acceder a estas rutas
teacherRouter.use(authMiddleware(["TEACHER", "ADMIN"]));

// Ver alumnos asignados
teacherRouter.get("/students", TeacherController.getAssignedStudents);

// Registrar seguimiento / evaluación
teacherRouter.get("/students/:studentId/followups", TeacherController.getFollowUps);


teacherRouter.get("/classes", TeacherController.getMyClasses);
