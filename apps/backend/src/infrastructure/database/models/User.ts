import mongoose, { Schema, Document, Model } from "mongoose";
import type { UserRole } from "../../../../../../domain/dist/entities/users/User.js";

export interface IUser extends Document {
  _id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  createdAt: Date;
}

const UserSchema = new Schema<IUser>({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: {
    type: String,
    enum: ["ADMIN", "TEACHER", "STUDENT", "USER"],
    default: "USER",
  },
  createdAt: { type: Date, default: Date.now },
});

export const UserModel: Model<IUser> = mongoose.model<IUser>("User", UserSchema);
