import mongoose, { Schema, Document } from "mongoose";

export interface IPromotion extends Document {
  studentId: string;
  oldBelt: string;
  newBelt: string;
  examDate: Date;
}

const PromotionSchema = new Schema<IPromotion>({
  studentId: { type: String, required: true },
  oldBelt: { type: String, required: true },
  newBelt: { type: String, required: true },
  examDate: { type: Date, required: true },
});

export const PromotionModel = mongoose.model<IPromotion>("Promotion", PromotionSchema);
