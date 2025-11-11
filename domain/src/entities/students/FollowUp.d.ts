export interface FollowUpPrimitives {
    _id: string;
    teacherId: string;
    studentId: string;
    comment: string;
    progress: string;
    date: Date;
}
export declare class FollowUp {
    private readonly props;
    constructor(props: FollowUpPrimitives);
    toPrimitives(): FollowUpPrimitives;
    static create(data: Omit<FollowUpPrimitives, "_id">): FollowUp;
}
