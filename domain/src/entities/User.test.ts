import { describe, it, expect } from "vitest";
import { User } from '../entities/User.js';



describe("User Entity", () => {
  it("should create a user with correct properties", () => {
    const user = new User("1", "Vanesa", "vanesasoria.com@gmail.com", "ADMIN");

    expect(user.id).toBe("1");
    expect(user.name).toBe("Vanesa");
    expect(user.email).toBe("vanesasoria.com@gmail.com");
    expect(user.role).toBe("ADMIN");
  });

   it("should allow only valid roles", () => {
    const user = new User("2", "Juan", "juan@gmail.com", "STUDENT");
    expect(user.role).toBe("STUDENT");
  });

  it("should throw error for invalid roles", () => {
    expect(() => new User("3", "Ana", "ana@gmail.com", "INVALID" as any))
      .toThrowError("Invalid role: INVALID");
  });

});
