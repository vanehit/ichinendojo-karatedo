import { Router } from "express";
import { UserControllerAdmin } from "../controllers/UserControllerAdmin.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

export const userAdminRouter = Router();

// Solo ADMIN puede crear otros ADMIN/TEACHER
userAdminRouter.post("/create", authMiddleware(["ADMIN"]), UserControllerAdmin.createUser);
