import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import tsConfigPaths from "tsconfig-paths";
import MongoConnectDB from "./infrastructure/database/connectDB.js";
import { router } from "./application/routes/index.js";


dotenv.config();

const baseUrl = "./src";
const paths = {
  "@domain/*": ["../../domain/src/*"],
  "@application/*": ["application/*"],
  "@infrastructure/*": ["infrastructure/*"],
  "@presentation/*": ["presentation/*"]
};
tsConfigPaths.register({ baseUrl, paths });

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

app.use("/api", router);

const PORT = process.env.PORT || 3000;

MongoConnectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Server running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error("❌ DB connection error:", err);
    process.exit(1);
  });
