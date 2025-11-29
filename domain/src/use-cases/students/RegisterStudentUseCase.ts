import { randomUUID } from "crypto";
import { Student } from "../../entities/students/Student.js";
import type { IStudentRepository } from "../../repositories/IStudentRepository.js";

export interface IRegisterStudent {
  name: string;
  email: string;
  userId: string;
  birthDate: Date | string;
  belt?: string | undefined;
  phone?: string | undefined;
  photo?: string | undefined;
}

export class RegisterStudentUseCase {
  constructor(private readonly studentRepo: IStudentRepository) {}

  async execute(data: IRegisterStudent): Promise<Student> {
    if (!data.name || !data.email || !data.userId || !data.birthDate) {
      throw new Error("Missing required fields");
    }

    const student = new Student(
      randomUUID(),
      data.name.trim(),
      data.email.toLowerCase(),
      data.userId,
      data.birthDate,
      data.belt ?? "WHITE",
      data.phone ?? "",
      data.photo ?? null
    );

    return this.studentRepo.create(student);
  }
}
