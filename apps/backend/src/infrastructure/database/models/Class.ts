import mongoose, { Schema, type Document } from "mongoose";

export interface IClass extends Document {
  teacherId: string;
  students: string[];
  date: Date;
  topic: string;
  description?: string;
  attendance?: string[];
}
const ClassSchema = new Schema<IClass>(
  {
    teacherId: { type: String, ref: "User", required: true },
    students: [{ type: String, ref: "Student" }],
    date: { type: Date, required: true },
    topic: { type: String, required: true },
    description: { type: String },
    attendance: [{ type: String, ref: "Student" }],
  },
  { timestamps: true }
);


export const ClassModel = mongoose.model<IClass>("Class", ClassSchema);
