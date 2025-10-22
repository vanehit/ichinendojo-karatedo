export type PaymentStatus = "PENDING" | "PAID" | "LATE";
export declare class Payment {
    id: string;
    studentId: string;
    amount: number;
    date: Date;
    status: PaymentStatus;
    month: number;
    year: number;
    createdAt: Date;
    constructor(id: string, studentId: string, amount: number, date: Date, status: PaymentStatus, month: number, year: number);
    private validateStatus;
    private validateMonth;
    private validateAmount;
    updateStatus(newStatus: PaymentStatus): void;
}
//# sourceMappingURL=Payment.d.ts.map