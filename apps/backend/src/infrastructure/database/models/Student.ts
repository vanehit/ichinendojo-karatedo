import mongoose, { Schema, Document, Model } from "mongoose";

export interface IStudent extends Document {
  _id: string;
  name: string;
  email: string;
  userId: string;
  birthDate: Date;
  belt?: string;
  phone?: string;
  photo?: string;
  createdAt: Date;
}

const StudentSchema = new Schema<IStudent>({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  userId: { type: String, required: true, ref: "User" },
  birthDate: { type: Date, required: true },
  belt: { type: String, default: "WHITE" },
  phone: { type: String },
  photo: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
});

export const StudentModel: Model<IStudent> = mongoose.model<IStudent>(
  "Student",
  StudentSchema
);
