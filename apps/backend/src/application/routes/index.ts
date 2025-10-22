import { Router } from "express";
import { studentRouter } from "./studentsRoutes";
import { paymentRouter } from "./paymentsRoutes";
import { promotionRouter } from "./promotionRoutes";
import { userRouter } from "./userRoutes";


export const router = Router();

router.get("/health", (req, res) => res.json({ status: "ok" }));

router.use("/users", userRouter);
router.use("/students", studentRouter);        // operaciones de estudiantes
router.use("/students/:id/payments", paymentRouter);  // pagos de un estudiante
router.use("/students/:id/promotions", promotionRouter); // promociones de un estudiante
