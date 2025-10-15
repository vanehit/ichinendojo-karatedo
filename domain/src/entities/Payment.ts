export type PaymentStatus = "PENDING" | "PAID" | "LATE";

export class Payment {
  public createdAt: Date;

  constructor(
    public id: string,
    public studentId: string,
    public amount: number,
    public date: Date,
    public status: PaymentStatus,
    public month: number,
    public year: number
  ) {
    this.validateStatus(status);
    this.validateMonth(month);
    this.validateAmount(amount);

    this.createdAt = new Date();
  }

  private validateStatus(status: PaymentStatus) {
    const validStatuses: PaymentStatus[] = ["PENDING", "PAID", "LATE"];
    if (!validStatuses.includes(status)) {
      throw new Error(`Invalid payment status: ${status}`);
    }
  }

  private validateMonth(month: number) {
    if (month < 1 || month > 12) {
      throw new Error(`Invalid month: ${month}`);
    }
  }

  private validateAmount(amount: number) {
    if (amount <= 0) {
      throw new Error(`Invalid amount: ${amount}`);
    }
  }

  // Método para cambiar estado
  updateStatus(newStatus: PaymentStatus) {
    this.validateStatus(newStatus);
    this.status = newStatus;
  }
}
