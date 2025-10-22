import { type BeltLevel } from "./BeltLevel.js";
export declare class Promotion {
    id: string;
    studentId: string;
    oldBelt: BeltLevel;
    newBelt: BeltLevel;
    examDate: Date;
    approved: boolean;
    createdAt: Date;
    constructor(id: string, studentId: string, oldBelt: BeltLevel, newBelt: BeltLevel, examDate: Date, approved?: boolean);
    private validateBelt;
    approve(): void;
}
//# sourceMappingURL=Promotion.d.ts.map