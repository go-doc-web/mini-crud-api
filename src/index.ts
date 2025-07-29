import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import { errorHandler } from "./middleware/errorHandler";
import userRoutes from "./routes/user.routes";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const DB_HOST = process.env.MONGO_URI as string;

// Middleware
app.use(express.json());
app.use(cors());
app.use(errorHandler);
// Base route

// app.get("/", (req, res) => {
//   res.send("Hello World!, This Api working !!!!!!");
// });
app.use("/api", userRoutes);

const startServer = async () => {
  try {
    await mongoose.connect(DB_HOST);
    console.log("✅ Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`🟢 Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

startServer();
