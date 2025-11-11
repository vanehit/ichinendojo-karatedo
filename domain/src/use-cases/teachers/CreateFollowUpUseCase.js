import { FollowUp } from "../../entities/students/FollowUp.js";
export class CreateFollowUpUseCase {
    followUpRepo;
    constructor(followUpRepo) {
        this.followUpRepo = followUpRepo;
    }
    async execute({ teacherId, studentId, comment, progress }) {
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
