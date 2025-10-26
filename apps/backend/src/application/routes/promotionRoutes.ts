import { Router } from "express";
import { PromotionController } from "../controllers/PromotionController.js";

export const promotionRouter = Router({ mergeParams: true });

// Rutas de promociones de un estudiante específico
promotionRouter.get("/", PromotionController.getPromotions);
promotionRouter.post("/", PromotionController.promoteStudent);
