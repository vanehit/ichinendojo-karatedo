import { Router } from "express";
import { UserController } from "../controllers/UserController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

export const userRouter = Router();

// 🔐 Solo accesibles con token válido (opcionalmente ADMIN)
userRouter.use(authMiddleware(["ADMIN"]));

userRouter.get("/", UserController.getUsers);
userRouter.get("/:id", UserController.getUserById);
userRouter.put("/:id", UserController.updateUser);
userRouter.delete("/:id", UserController.deleteUser);
