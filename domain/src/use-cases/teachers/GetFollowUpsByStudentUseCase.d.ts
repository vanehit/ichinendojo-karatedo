import type { IFollowUpRepository } from "../../repositories/IFollowUpRepository.js";
export declare class GetFollowUpsByStudentUseCase {
    private readonly followUpRepo;
    constructor(followUpRepo: IFollowUpRepository);
    execute(studentId: string): Promise<import("../../entities/index.js").FollowUpPrimitives[]>;
}
