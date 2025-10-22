import { Router } from "express";
import { PromotionController } from "../controllers/PromotionController";

export const promotionRouter = Router({ mergeParams: true });

// Obtener todas las promociones de un estudiante
promotionRouter.get("/", PromotionController.getPromotions);

// Crear una promoción para un estudiante
promotionRouter.post("/", PromotionController.promoteStudent);
