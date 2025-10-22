import { isValidBeltLevel } from "./BeltLevel.js";
export class Promotion {
    id;
    studentId;
    oldBelt;
    newBelt;
    examDate;
    approved;
    createdAt;
    constructor(id, studentId, oldBelt, newBelt, examDate, approved = false) {
        this.id = id;
        this.studentId = studentId;
        this.oldBelt = oldBelt;
        this.newBelt = newBelt;
        this.examDate = examDate;
        this.validateBelt(oldBelt);
        this.validateBelt(newBelt);
        this.approved = approved;
        this.createdAt = new Date();
    }
    validateBelt(belt) {
        if (!isValidBeltLevel(belt)) {
            throw new Error(`Invalid belt level: ${belt}`);
        }
    }
    // Método para aprobar la promoción
    approve() {
        this.approved = true;
    }
}
//# sourceMappingURL=Promotion.js.map