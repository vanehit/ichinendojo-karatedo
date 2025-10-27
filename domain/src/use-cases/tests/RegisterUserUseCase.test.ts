import { mockUserRepo } from "./mocks/MockUserRepository.js";
import { RegisterUserUseCase } from "../users/RegisterUserUseCase.js";
import { describe, it, expect, vi, beforeEach } from "vitest";

describe("RegisterUserUseCase", () => {
  beforeEach(() => vi.clearAllMocks());

  it("should register a user with default role STUDENT", async () => {
    const useCase = new RegisterUserUseCase(mockUserRepo);

    const newUserData = { name: "Vanesa", email: "vane@gmail.com", password: "1234" };
    
    const result = await useCase.execute(newUserData);

    expect(mockUserRepo.create).toHaveBeenCalledTimes(1);
    expect(result.role).toBe("STUDENT");
  });
});
