import express from "express";
import { contactController } from "../controllers/contactController.js";

const router = express.Router();

router.post("/", contactController.sendMessage);
router.get("/", contactController.listMessages);

export default router;
