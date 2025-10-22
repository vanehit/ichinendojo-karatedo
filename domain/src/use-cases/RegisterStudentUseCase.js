import {} from "../entities/BeltLevel.js";
import { Student } from "../entities/Student.js";
export class RegisterStudentUseCase {
    execute(data) {
        const belt = data.belt || "WHITE"; //Default belt
        return new Student(data.id, data.userId, data.birthDate, belt, data.phone);
    }
}
//# sourceMappingURL=RegisterStudentUseCase.js.map