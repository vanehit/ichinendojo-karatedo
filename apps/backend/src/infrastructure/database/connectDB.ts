import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MongoConnectDB = async (): Promise<void> => {
  try {
   const uri: string = process.env.MONGO_URI ?? "mongodb://127.0.0.1:27017/ichinendojo-karatedo_db";
    console.log("🔗 Attempting MongoDB connection to:", uri);
    await mongoose.connect(uri);
    console.log("✅ MongoDB connected successfully");
  } catch (error: any) {
    console.error("❌ Error connecting to MongoDB:", error.message);
    console.error(error);
    throw error;
  }
};

export default MongoConnectDB;
