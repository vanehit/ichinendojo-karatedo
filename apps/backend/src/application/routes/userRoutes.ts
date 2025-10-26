import { Router } from "express";
import { UserController } from "../controllers/UserController.js";

export const userRouter = Router();

userRouter.get("/", UserController.getUsers);
userRouter.post("/", UserController.registerUser);
userRouter.get("/:id", UserController.getUserById);
userRouter.put("/:id", UserController.updateUser);
userRouter.delete("/:id", UserController.deleteUser);
