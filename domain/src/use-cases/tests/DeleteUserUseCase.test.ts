import { describe, it, expect, vi, beforeEach } from "vitest";
import { DeleteUserUseCase } from "../DeleteUserUseCase.js";
import { mockUserRepo } from "../../use-cases/tests/mocks/MockUserRepository.js";

describe("DeleteUserUseCase", () => {
  beforeEach(() => vi.clearAllMocks());

  it("should call delete on repository with correct ID", async () => {
    const useCase = new DeleteUserUseCase(mockUserRepo);
    await useCase.execute("123");

    expect(mockUserRepo.delete).toHaveBeenCalledWith("123");
    expect(mockUserRepo.delete).toHaveBeenCalledTimes(1);
  });
});
