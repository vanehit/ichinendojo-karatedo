import { Router } from "express";
import { PaymentController } from "../controllers/PaymentController.js";

export const paymentRouter = Router({ mergeParams: true });

// Rutas de pagos de un estudiante específico
paymentRouter.get("/", PaymentController.getPayments);
paymentRouter.post("/", PaymentController.makePayment);
