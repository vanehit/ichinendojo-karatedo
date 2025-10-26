import mongoose, { Schema, Document, Model } from "mongoose";
import type { BeltLevel } from "../../../../../../domain/src/entities/BeltLevel.js";

export interface IStudent extends Document {
  _id: string;
  name: string;
  email: string;
  userId: string;
  birthDate: Date;
  belt: BeltLevel;
  phone?: string;
  createdAt: Date;
}

const BELT_LEVELS: BeltLevel[] = [
  "WHITE",
  "LIGHTBLUE",
  "YELLOW",
  "ORANGE",
  "GREEN",
  "BLUE",
  "BROWN",
  "BLACK",
];

const StudentSchema = new Schema<IStudent>({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  userId: { type: String, required: true, ref: "User" }, 
  birthDate: { type: Date, required: true },
  belt: {
    type: String,
    enum: BELT_LEVELS,
    uppercase: true,
    default: "WHITE",
  },
  phone: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export const StudentModel: Model<IStudent> = mongoose.model<IStudent>("Student", StudentSchema);
