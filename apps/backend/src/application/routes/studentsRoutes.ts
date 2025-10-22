import { Router } from "express";
import { StudentController } from "../controllers/StudentController";


export const studentRouter = Router();

studentRouter.get("/", StudentController.getStudents);
studentRouter.post("/", StudentController.registerStudent);
