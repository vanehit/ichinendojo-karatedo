import { type BeltLevel } from "../entities/BeltLevel.js";
import { Student } from "../entities/Student.js";
export declare class RegisterStudentUseCase {
    execute(data: {
        id: string;
        userId: string;
        birthDate: Date;
        belt?: BeltLevel;
        phone?: string;
    }): Student;
}
//# sourceMappingURL=RegisterStudentUseCase.d.ts.map