import type { IFollowUpRepository } from "../../repositories/IFollowUpRepository.js";

export class GetFollowUpsByStudentUseCase {
  constructor(private readonly followUpRepo: IFollowUpRepository) {}

  async execute(studentId: string) {
    const followUps = await this.followUpRepo.getByStudent(studentId);
    return followUps.map(f => f.toPrimitives());
  }
}
