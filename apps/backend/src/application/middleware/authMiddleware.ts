import jwt, { type JwtPayload } from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";

interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

export const authMiddleware = (allowedRoles?: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "No token provided" });
    }

    const [, token] = authHeader.split(" ");
    if (!token) {
      return res.status(401).json({ message: "Malformed token" });
    }

    try {
      const secret = process.env.JWT_SECRET;
      if (!secret) {
        throw new Error("JWT_SECRET not configured");
      }

      const decoded = jwt.verify(token, secret) as JwtPayload & {
        id: string;
        email: string;
        role: string;
      };

      if (allowedRoles && !allowedRoles.includes(decoded.role)) {
        return res.status(403).json({ message: "Access denied" });
      }

      req.user = {
        id: decoded.id,
        email: decoded.email,
        role: decoded.role,
      };

      next();
    } catch (error) {
      console.error("❌ Token verification error:", error);
      return res.status(401).json({ message: "Invalid or expired token" });
    }
  };
};
