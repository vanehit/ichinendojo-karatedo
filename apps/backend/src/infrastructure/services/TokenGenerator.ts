import jwt, { type JwtPayload, type Secret, type SignOptions } from "jsonwebtoken";
import type { ITokenGenerator } from "../../../../../domain/dist/services/ITokenGenerator.js";
import ms, { type StringValue } from "ms";

export class JwtTokenGenerator implements ITokenGenerator {
  private secret: Secret = process.env.JWT_SECRET ?? "secretkeys";

  generate(payload: JwtPayload | object, expiresIn: string = "1h"): string {
    // Explicamos a TypeScript que es un StringValue válido
    const options: SignOptions = { expiresIn: expiresIn as StringValue };
    return jwt.sign(payload, this.secret, options);
  }

  verify(token: string): object | null {
    try {
      const decoded = jwt.verify(token, this.secret);
      return typeof decoded === "string" ? { data: decoded } : decoded;
    } catch {
      return null;
    }
  }
}
