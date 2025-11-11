import { LoginUserUseCase } from './../LoginUserUseCase';
import { vi, describe, it, expect, beforeEach } from "vitest";
import { mockUserRepo } from "./mocks/MockUserRepository.js";
const mockHasher = {
    compare: vi.fn(async (password, hash) => password === "1234" && hash === "hashed-1234"),
};
const mockTokenGen = {
    generate: vi.fn(() => "mock-token"),
    verify: vi.fn(() => ({ userId: "1", role: "STUDENT" })),
};
describe("LoginUserUseCase", () => {
    beforeEach(() => vi.clearAllMocks());
    it("should return a token for valid credentials", async () => {
        const existingUser = {
            id: "1",
            name: "Vanesa",
            email: "vane@gmail.com",
            password: "hashed-1234",
            role: "STUDENT",
            toPrimitives: () => ({ id: "1", name: "Vanesa", email: "vane@gmail.com", role: "STUDENT" }),
        };
        mockUserRepo.findByEmail = vi.fn(async () => existingUser);
        const useCase = new LoginUserUseCase(mockUserRepo, mockHasher, mockTokenGen);
        const result = await useCase.execute("vane@gmail.com", "1234");
        expect(result.token).toBe("mock-token");
        expect(mockHasher.compare).toHaveBeenCalledWith("1234", "hashed-1234");
        expect(mockTokenGen.generate).toHaveBeenCalledWith({ userId: "1", role: "STUDENT" });
    });
    it("should throw if credentials are invalid", async () => {
        mockUserRepo.findByEmail = vi.fn(async () => null); // no encuentra usuario
        const useCase = new LoginUserUseCase(mockUserRepo, mockHasher, mockTokenGen);
        await expect(useCase.execute("wrong@gmail.com", "1234")).rejects.toThrow("Invalid credentials");
    });
});
