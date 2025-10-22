import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { router } from "./application/routes/index";
import connectDB from "./infrastructure/database/connectDB";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", router);

const PORT = process.env.PORT || 3000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Server running on http://localhost:${PORT}`);
    });
  })
  .catch(err => console.error("❌ DB connection error:", err));
