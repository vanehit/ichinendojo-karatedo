import { randomUUID } from "crypto";
import { Teacher } from "../../entities/teachears/Teacher.js";
import type { ITeacherRepository } from "../../repositories/ITeacherRepository.js";

export interface IRegisterTeacher {
  name: string;
  email: string;
  userId: string;
  belt?: string | undefined;
  phone?: string | undefined;
  photo?: string | undefined | null;
}

export class RegisterTeacherUseCase {
  constructor(private readonly teacherRepo: ITeacherRepository) {}

  async execute(data: IRegisterTeacher): Promise<Teacher> {
    if (!data.name || !data.email || !data.userId) {
      throw new Error("Missing required fields");
    }

    const teacher = new Teacher(
      randomUUID(),
      data.name.trim(),
      data.email.toLowerCase(),
      data.userId,
      data.belt ?? "BLACK",
      data.phone ?? "",
      data.photo ?? null
    );

    return this.teacherRepo.create(teacher);
  }
}
