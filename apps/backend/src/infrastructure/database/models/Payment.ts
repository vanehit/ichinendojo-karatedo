import mongoose, { Schema, Document } from "mongoose";

const PAYMENT_STATUS = ["PAID", "PENDING", "LATE"] as const;

export interface IPayment extends Document {
  studentId: string;            
  amount: number;
  date: Date;
  status: typeof PAYMENT_STATUS[number];
  month: number;                 
  year: number;
  createdAt: Date;
}

const PaymentSchema = new Schema<IPayment>({
  studentId: { type: String, required: true, ref: "STUDENT" },
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  status: { type: String, enum: PAYMENT_STATUS, default: "PENDING" },
  month: { type: Number, required: true, min: 1, max: 12 },
  year: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const PaymentModel = mongoose.model<IPayment>("Payment", PaymentSchema);
