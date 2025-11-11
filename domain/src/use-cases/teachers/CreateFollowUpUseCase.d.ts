import type { IFollowUpRepository } from "../../repositories/IFollowUpRepository.js";
interface CreateFollowUp {
    teacherId: string;
    studentId: string;
    comment: string;
    progress: string;
}
export declare class CreateFollowUpUseCase {
    private readonly followUpRepo;
    constructor(followUpRepo: IFollowUpRepository);
    execute({ teacherId, studentId, comment, progress }: CreateFollowUp): Promise<import("../../entities/students/FollowUp.js").FollowUpPrimitives>;
}
export {};
