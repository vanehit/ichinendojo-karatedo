import { describe, it, expect, vi, beforeEach } from "vitest";
import { UpdateUserUseCase } from "../UpdateUserUseCase.js";
import { mockUserRepo } from "../../use-cases/tests/mocks/MockUserRepository.js";
import { User } from "../../entities/users/User.js";
describe("UpdateUserUseCase", () => {
    beforeEach(() => vi.clearAllMocks());
    it("should update a user and return updated user", async () => {
        const updatedUser = new User("1", "NuevoNombre", "juan@gmail.com", "1234", "STUDENT");
        mockUserRepo.update.mockResolvedValue(updatedUser);
        const useCase = new UpdateUserUseCase(mockUserRepo);
        const result = await useCase.execute("1", { name: "NuevoNombre" });
        expect(result?.name).toBe("NuevoNombre");
        expect(mockUserRepo.update).toHaveBeenCalledWith("1", { name: "NuevoNombre" });
    });
});
