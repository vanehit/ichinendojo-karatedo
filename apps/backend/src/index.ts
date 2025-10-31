import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { errorMiddleware } from "./application/middleware/errorMiddleware.js";
import { router } from "./application/routes/index.js";
import MongoConnectDB from "./infrastructure/database/connectDB.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", router);
app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;

console.log("🚀 Starting backend...");

(async () => {
  try {
    await MongoConnectDB(); 
    console.log("📡 DB connected, starting server...");
    app.listen(PORT, () => {
      console.log(`✅ Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Error during backend startup:", err);
  }
})();
