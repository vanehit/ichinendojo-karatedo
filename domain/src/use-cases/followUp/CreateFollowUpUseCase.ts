import { FollowUp } from "../../entities/students/FollowUp.js";
import type { IFollowUpRepository } from "../../repositories/IFollowUpRepository.js";

interface CreateFollowUp {
  teacherId: string;
  studentId: string;
  comment: string;
  progress: string;
}

export class CreateFollowUpUseCase {
  constructor(private readonly followUpRepo: IFollowUpRepository) {}

  async execute({ teacherId, studentId, comment, progress }: CreateFollowUp) {
    const followUp = FollowUp.create({
      teacherId,
      studentId,
      comment,
      progress,
      date: new Date(),
    });

    await this.followUpRepo.create(followUp);
    return followUp.toPrimitives();
  }
}
