import { Router } from "express";
import { PaymentController } from "../controllers/PaymentController";

export const paymentRouter = Router({ mergeParams: true });

paymentRouter.post("/", PaymentController.makePayment);
paymentRouter.get("/", PaymentController.getPayments); 
