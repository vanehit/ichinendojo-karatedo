import { Promotion } from "../entities/Promotion.js";
import { Student } from "../entities/Student.js";
export class PromoteStudentUseCase {
    execute(student, promotion) {
        if (promotion.oldBelt !== student.belt) {
            throw new Error("The current belt does not match the promotion.");
        }
        promotion.approve();
        student.addPromotion(promotion);
        student.belt = promotion.newBelt;
        return student;
    }
}
//# sourceMappingURL=PromoteStudentUseCase.js.map