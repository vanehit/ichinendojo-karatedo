import { describe, it, expect, vi, beforeEach } from "vitest";
import { GetUserByIdUseCase } from "../users/GetUserByIdUseCase.js";
import { mockUserRepo } from "../../use-cases/tests/mocks/MockUserRepository.js";
import { User } from "../../entities/User.js";

describe("GetUserByIdUseCase", () => {
  beforeEach(() => vi.clearAllMocks());

  it("should return a user by ID", async () => {
    const user = new User("1", "Juan", "juan@gmail.com", "1234", "STUDENT");
    (mockUserRepo.findById as any).mockResolvedValue(user);

    const useCase = new GetUserByIdUseCase(mockUserRepo);
    const result = await useCase.execute("1");

    expect(result?.email).toBe("juan@gmail.com");
    expect(mockUserRepo.findById).toHaveBeenCalledWith("1");
  });

  it("should throw if ID is missing", async () => {
    const useCase = new GetUserByIdUseCase(mockUserRepo);
    await expect(useCase.execute("")).rejects.toThrow("User ID is required");
  });
});
