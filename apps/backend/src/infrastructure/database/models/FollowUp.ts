import mongoose, { Schema } from "mongoose";

const FollowUpSchema = new Schema({
  _id: { type: String, required: true },
  teacherId: { type: String, required: true, ref: "User" },
  studentId: { type: String, required: true, ref: "Student" },
  comment: { type: String, required: true },
  progress: { type: String, required: true },
  date: { type: Date, required: true, default: Date.now },
});

export const FollowUpModel = mongoose.model("FollowUp", FollowUpSchema);
