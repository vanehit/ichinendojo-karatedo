import { describe, it, expect, vi, beforeEach } from "vitest";
import { GetUsersUseCase } from "../GetUsersUseCase.js";
import { mockUserRepo } from "../../use-cases/tests/mocks/MockUserRepository.js";
import { User } from "../../entities/users/User.js";

describe("GetUsersUseCase", () => {
  beforeEach(() => vi.clearAllMocks());

  it("should return all users from repository", async () => {
    const fakeUsers = [
      new User("1", "Juan", "juan@gmail.com", "1234", "STUDENT"),
      new User("2", "Ana", "ana@gmail.com", "5678", "TEACHER"),
    ];
    (mockUserRepo.getAll as any).mockResolvedValue(fakeUsers);

    const useCase = new GetUsersUseCase(mockUserRepo);
    const result = await useCase.execute();

    expect(result).toHaveLength(2);
    expect(result[0].name).toBe("Juan");
    expect(mockUserRepo.getAll).toHaveBeenCalledTimes(1);
  });
});
