export class GetFollowUpsByStudentUseCase {
    followUpRepo;
    constructor(followUpRepo) {
        this.followUpRepo = followUpRepo;
    }
    async execute(studentId) {
        const followUps = await this.followUpRepo.getByStudent(studentId);
        return followUps.map(f => f.toPrimitives());
    }
}
