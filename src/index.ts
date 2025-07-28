import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const DB_HOST = process.env.MONGO_URI as string;

// Middleware
app.use(express.json());
// Base route

app.get("/", (req, res) => {
  res.send("Hello World!, This Api working !!!!!!");
});

const startServer = async () => {
  try {
    await mongoose.connect(DB_HOST);
    console.log("✅ Підключено до MongoDB");
    app.listen(PORT, () => {
      console.log(`🟢 Сервер запущено на порту ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Помилка підключення до MongoDB:", error);
    process.exit(1);
  }
};

startServer();
