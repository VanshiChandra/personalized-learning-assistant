import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import authRoutes from "./routes/auth.js";
import scoresRoutes from "./routes/scores.js";
import leaderboardRoutes from "./routes/leaderboard.js";
import progressRoutes from "./routes/progress.js";

dotenv.config();
const app = express();

// ✅ Looser CORS config for development + production
app.use(
  cors({
    origin: [
      "http://localhost:3000", // local dev
      "https://personalized-learning-assistant-two.vercel.app", // deployed frontend
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/scores", scoresRoutes);
app.use("/api/leaderboard", leaderboardRoutes);
app.use("/api/progress", progressRoutes);

// ✅ Health check
app.get("/", (req, res) => {
  res.send("✅ Backend is running...");
});

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err.message));

// ✅ Global error handler
app.use((err, req, res, next) => {
  console.error("❌ Server error:", err.stack);
  res
    .status(500)
    .json({ error: "Internal server error", details: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
