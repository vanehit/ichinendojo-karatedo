import { Router } from "express";
import { userRouter } from "./userRoutes.js";
import { authRouter } from "./authRoutes.js";
import { studentsRouter } from "./studentsRoutes.js";
import { userAdminRouter } from "./userRoutesAdmin.js";


export const router = Router();

// Health check
router.get("/health", (req, res) => res.json({ status: "ok" }));

// Rutas de usuarios
router.use("/users", userRouter);

// Rutas de estudiantes
router.use("/students", studentsRouter);

router.use("/auths", authRouter);

router.use("/users", userAdminRouter);

