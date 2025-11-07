import type { IClassRepository } from "../../repositories/IClassRepository.js";
import { Class } from "../../entities/classes/Class.js";

interface UpdateClassDTO {
  id: string;
  teacherId: string;
  students: string[];
  date: Date;
  topic: string;
  description?: string;
  attendance?: string[];
}

export class UpdateClassUseCase {
  constructor(private classRepo: IClassRepository) {}

  async execute(data: UpdateClassDTO): Promise<Class> {
    const updatedClass = new Class({
      ...data,
      _id: data.id,
    });

    return await this.classRepo.update(updatedClass);
  }
}
