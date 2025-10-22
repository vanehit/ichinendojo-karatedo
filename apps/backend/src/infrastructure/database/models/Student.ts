import mongoose, { Schema, Document } from "mongoose";

export interface IStudent extends Document {
  userId: string;
  birthDate: Date;
  belt: string;
  phone?: string;
}

const BELT_LEVELS = ["WHITE","YELLOW","ORANGE","GREEN","BLUE","BROWN","BLACK"];

const StudentSchema = new Schema<IStudent>({
  userId: { type: String, required: true },
  birthDate: { type: Date, required: true },
  belt: { 
    type: String, 
    enum: BELT_LEVELS,   
    uppercase: true,    
    default: "WHITE" 
  },
  phone: { type: String },
});

export const StudentModel = mongoose.model<IStudent>("Student", StudentSchema);
