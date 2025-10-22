import mongoose, { Schema, Document } from "mongoose";

export interface IPayment extends Document {
  studentId: string;
  amount: number;
  date: Date;
  status: "PAID" | "PENDING";
  month?: string;
  year?: number;
}

const PaymentSchema = new Schema<IPayment>({
  studentId: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  status: { type: String, enum: ["PAID", "PENDING"], default: "PENDING" },
  month: { type: String },
  year: { type: Number },
});

export const PaymentModel = mongoose.model<IPayment>("Payment", PaymentSchema);
