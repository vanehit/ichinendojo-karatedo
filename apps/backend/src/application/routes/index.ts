import { Router } from "express";
import { userRouter } from "./userRoutes.js";
import { studentRouter } from "./studentsRoutes.js";
import { paymentRouter } from "./paymentsRoutes.js";
import { promotionRouter } from "./promotionRoutes.js";

export const router = Router();

// Health check
router.get("/health", (req, res) => res.json({ status: "ok" }));

// Rutas de usuarios
router.use("/users", userRouter);

// Rutas de estudiantes
router.use("/students", studentRouter);

// Rutas anidadas de pagos y promociones
router.use("/students/:studentId/payments", paymentRouter);
router.use("/students/:studentId/promotions", promotionRouter);
