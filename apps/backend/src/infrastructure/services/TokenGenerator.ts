import jwt, { type JwtPayload, type SignOptions } from "jsonwebtoken";
import type { ITokenGenerator } from "../../../../../domain/dist/services/ITokenGenerator.js";

export class JwtTokenGenerator implements ITokenGenerator {
  private secret = process.env.JWT_SECRET || "secretkeys";

  generate(payload: JwtPayload | object, expiresIn: string = "1h"): string {
    // @ts-ignore: workaround por tipos de jsonwebtoken v9
    return jwt.sign(payload, this.secret, { expiresIn });
  }

  verify(token: string): object | null {
    try {
      const decoded = jwt.verify(token, this.secret);
      if (typeof decoded === "string") return { data: decoded };
      return decoded;
    } catch {
      return null;
    }
  }
}
