import { randomUUID } from "crypto";
import { Student } from "../../entities/students/Student.js";
import type { IStudentRepository } from "../../repositories/IStudentRepository.js";

export class RegisterStudentUseCase {
  constructor(private studentRepo: IStudentRepository) {}

  async execute(data: {
    name: string;
    email: string;
    birthDate: string | Date;
    userId: string;
    belt?: string;
    phone?: string;
  }): Promise<Student> {
    const birthDate =
      typeof data.birthDate === "string"
        ? new Date(data.birthDate)
        : data.birthDate;

    const student = new Student(
      randomUUID(),
      data.name,
      data.email,
      data.userId,
      birthDate,
      data.belt ?? "WHITE",
      data.phone
    );

    return this.studentRepo.create(student);
  }
}
