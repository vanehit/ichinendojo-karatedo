import { User } from '../users/User';
import { describe, it, expect } from "vitest";
describe("User Entity", () => {
    it("should create a user with correct properties", () => {
        const user = new User("1", "Vanesa", "vanesasoria@gmail.com", "hashedpassword123", "ADMIN");
        expect(user.id).toBe("1");
        expect(user.name).toBe("Vanesa");
        expect(user.email).toBe("vanesasoria@gmail.com");
        expect(user.role).toBe("ADMIN");
        expect(user.password).toBe("hashedpassword123");
        expect(user.createdAt).toBeInstanceOf(Date);
    });
    it("should default to STUDENT role if not provided", () => {
        const user = new User("2", "Juan", "juan@gmail.com", "mypassword");
        expect(user.role).toBe("STUDENT");
    });
    it("should throw error for invalid roles", () => {
        expect(() => new User("3", "Ana", "ana@gmail.com", "password", "INVALID")).toThrowError("Invalid role: INVALID");
    });
    it("should allow setting a new password", () => {
        const user = new User("4", "Luca", "luca@gmail.com", "oldhash");
        user.setPassword("newhash");
        expect(user.password).toBe("newhash");
    });
    it("should return only public fields in toPrimitives()", () => {
        const user = new User("5", "Laura", "laura@gmail.com", "secret", "TEACHER");
        const primitives = user.toPrimitives();
        expect(primitives).toEqual({
            id: "5",
            name: "Laura",
            email: "laura@gmail.com",
            role: "TEACHER",
            createdAt: expect.any(Date),
        });
        expect(primitives).not.toHaveProperty("_passwordHash");
    });
});
