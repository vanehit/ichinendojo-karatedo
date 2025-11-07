import { Router } from "express";
import { userRouter } from "./userRoutes.js";
import { authRouter } from "./authRoutes.js";
import { studentsRouter } from "./studentsRoutes.js";
import { userAdminRouter } from "./userRoutesAdmin.js";
import { teacherRouter } from "./teacherRoutes.js"; 
import contactRoutes from "./contactRoutes.js";

export const router = Router();

// Health check
router.get("/health", (req, res) => res.json({ status: "ok" }));

// Rutas
router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/users", userAdminRouter);
router.use("/students", studentsRouter);
router.use("/teachers", teacherRouter); 
router.use("/contact", contactRoutes);
