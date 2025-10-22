export class Payment {
    id;
    studentId;
    amount;
    date;
    status;
    month;
    year;
    createdAt;
    constructor(id, studentId, amount, date, status, month, year) {
        this.id = id;
        this.studentId = studentId;
        this.amount = amount;
        this.date = date;
        this.status = status;
        this.month = month;
        this.year = year;
        this.validateStatus(status);
        this.validateMonth(month);
        this.validateAmount(amount);
        this.createdAt = new Date();
    }
    validateStatus(status) {
        const validStatuses = ["PENDING", "PAID", "LATE"];
        if (!validStatuses.includes(status)) {
            throw new Error(`Invalid payment status: ${status}`);
        }
    }
    validateMonth(month) {
        if (month < 1 || month > 12) {
            throw new Error(`Invalid month: ${month}`);
        }
    }
    validateAmount(amount) {
        if (amount <= 0) {
            throw new Error(`Invalid amount: ${amount}`);
        }
    }
    // Método para cambiar estado
    updateStatus(newStatus) {
        this.validateStatus(newStatus);
        this.status = newStatus;
    }
}
//# sourceMappingURL=Payment.js.map