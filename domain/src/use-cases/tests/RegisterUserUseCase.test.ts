import { RegisterUserUseCase } from './../RegisterUserUseCase';
import { describe, it, expect, vi, beforeEach } from "vitest";
import { mockUserRepo } from './mocks/MockUserRepository';

const mockHasher = {
  hash: vi.fn(async (password: string) => "hashed-" + password),
};

describe("RegisterUserUseCase", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should register a user with default role STUDENT and hash password", async () => {
    const useCase = new RegisterUserUseCase(mockUserRepo, mockHasher);

    const newUserData = { name: "Vanesa", email: "vane@gmail.com", password: "1234" };

    const result = await useCase.execute(newUserData);
    
    expect(mockUserRepo.create).toHaveBeenCalledTimes(1);

    expect(mockHasher.hash).toHaveBeenCalledWith("1234");
  
    expect(result.password).toBe("hashed-1234");
   
    expect(result.role).toBe("STUDENT");
  });
});
