import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import MongoConnectDB from './infrastructure/database/connectDB.js';
import { router } from "./application/routes/index.js";

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api", router);

// Middleware de error global opcional
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error("❌ Unhandled error:", err);
  res.status(500).json({ message: "Internal server error" });
});

const PORT = process.env.PORT || 3000;

// Conexión a MongoDB y arranque del servidor
MongoConnectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Server running on http://localhost:${PORT}`);
    });
  })
  .catch(err => console.error("❌ DB connection error:", err));
