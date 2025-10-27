// src/application/middleware/errorMiddleware.ts
import type { Request, Response, NextFunction } from "express";

export const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("❌ Error:", err.message || err);
  res.status(err.status || 500).json({
    message: err.message || "Internal server error",
  });
};
