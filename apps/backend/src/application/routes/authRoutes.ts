import { Router } from "express";
import { AuthController } from "../controllers/AuthController.js"; 

export const authRouter = Router();

// Rutas de autenticación
authRouter.post("/register", AuthController.register);
authRouter.post("/login", AuthController.login);
authRouter.post("/logout", AuthController.logout);
