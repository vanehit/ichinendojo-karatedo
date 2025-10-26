import mongoose, { Schema, Document } from "mongoose";
import type { BeltLevel } from "../../../../../../domain/src/entities/BeltLevel.js";

const BELT_LEVELS: BeltLevel[] = [
  "WHITE","LIGHTBLUE","YELLOW","ORANGE","GREEN","BLUE","BROWN","BLACK"
];

export interface IPromotion extends Document {
  studentId: string;           
  oldBelt: BeltLevel;
  newBelt: BeltLevel;
  examDate: Date;
  approved: boolean;
  createdAt: Date;
}

const PromotionSchema = new Schema<IPromotion>({
  studentId: { type: String, required: true, ref: "STUDENT" },
  oldBelt: { type: String, enum: BELT_LEVELS, required: true, uppercase: true },
  newBelt: { type: String, enum: BELT_LEVELS, required: true, uppercase: true },
  examDate: { type: Date, required: true },
  approved: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export const PromotionModel = mongoose.model<IPromotion>("Promotion", PromotionSchema);
