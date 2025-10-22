import { isValidBeltLevel } from "./BeltLevel.js";
export class Student {
    id;
    userId;
    birthDate;
    belt;
    phone;
    promotions = [];
    payments = []; //inicializado payment
    createdAt;
    constructor(id, userId, birthDate, belt, phone) {
        this.id = id;
        this.userId = userId;
        this.birthDate = birthDate;
        this.belt = belt;
        this.phone = phone;
        this.validateBelt(belt);
        this.createdAt = new Date();
    }
    validateBelt(belt) {
        if (!isValidBeltLevel(belt)) {
            throw new Error(`Invalid belt level: ${belt}`);
        }
    }
    addPromotion(promotion) {
        if (promotion.studentId !== this.id) {
            throw new Error("Promotion studentId does not match this student");
        }
        this.promotions.push(promotion);
    }
    addPayment(payment) {
        if (payment.studentId !== this.id) {
            throw new Error("Payment studentId does not match this student");
        }
        this.payments.push(payment);
    }
}
//# sourceMappingURL=Student.js.map