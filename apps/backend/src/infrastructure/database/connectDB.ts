import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MongoConnectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/ichinendojo-karatedo_db");
    console.log("✅ MongoDB connected successfully");
  } catch (error: any) {
    console.error("❌ Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
};

export default MongoConnectDB;
