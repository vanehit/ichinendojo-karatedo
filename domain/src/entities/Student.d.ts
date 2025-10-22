import { type BeltLevel } from "./BeltLevel.js";
import type { Payment } from "./Payment.js";
import type { Promotion } from "./Promotion.js";
export declare class Student {
    id: string;
    userId: string;
    birthDate: Date;
    belt: BeltLevel;
    phone?: string | undefined;
    promotions: Promotion[];
    payments: Payment[];
    createdAt: Date;
    constructor(id: string, userId: string, birthDate: Date, belt: BeltLevel, phone?: string | undefined);
    private validateBelt;
    addPromotion(promotion: Promotion): void;
    addPayment(payment: Payment): void;
}
//# sourceMappingURL=Student.d.ts.map