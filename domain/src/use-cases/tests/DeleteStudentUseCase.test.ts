import { describe, it, expect, beforeEach, vi } from "vitest";
import { DeleteStudentUseCase } from "../../use-cases/students/DeleteStudentUseCase.js";
import { mockStudentRepo } from "./mocks/MockStudentRepository.js";

describe("DeleteStudentUseCase", () => {
  beforeEach(() => {
    vi.clearAllMocks(); 
  });

  it("should call repository.delete with the correct id", async () => {
    const useCase = new DeleteStudentUseCase(mockStudentRepo);

    await useCase.execute("s1");

    expect(mockStudentRepo.delete).toHaveBeenCalledTimes(1);
    expect(mockStudentRepo.delete).toHaveBeenCalledWith("s1");
  });

  it("should throw an error if repository.delete fails", async () => {
    const useCase = new DeleteStudentUseCase(mockStudentRepo);

    mockStudentRepo.delete.mockRejectedValue(new Error("DB error"));

    await expect(useCase.execute("s1")).rejects.toThrow("DB error");
  });
});
