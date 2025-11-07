import type { IClassRepository } from "../../repositories/IClassRepository.js";
import { Class } from "../../entities/classes/Class.js";

interface CreateClassDTO {
  teacherId: string;
  students: string[];
  date: Date;
  topic: string;
  description?: string;
}

export class CreateClassUseCase {
  constructor(private classRepo: IClassRepository) {}

  async execute(data: CreateClassDTO): Promise<Class> {
    const newClass = new Class({
      ...data,
      attendance: [],
    });

    return await this.classRepo.create(newClass);
  }
}
