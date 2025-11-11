export interface ClassPrimitives {
    _id?: string;
    teacherId: string;
    students: string[];
    date: Date;
    topic: string;
    description?: string;
    attendance?: string[];
}
export declare class Class {
    private readonly props;
    constructor(props: ClassPrimitives);
    static create(data: Omit<ClassPrimitives, "_id">): Class;
    toPrimitives(): ClassPrimitives;
}
