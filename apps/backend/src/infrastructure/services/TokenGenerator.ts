import jwt from "jsonwebtoken";
import type { ITokenGenerator } from "../../../../../domain/src/services/ITokenGenerator.js";

export class JwtTokenGenerator implements ITokenGenerator {
  private secret = process.env.JWT_SECRET || "secretkeys";

  generate(payload: object, expiresIn: string = "1h"): string {
    return jwt.sign(payload, this.secret, { expiresIn });
  }

  verify(token: string): object | null {
    try {
      return jwt.verify(token, this.secret);
    } catch {
      return null;
    }
  }
}
