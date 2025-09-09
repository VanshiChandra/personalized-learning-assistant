import express from "express";
import Score from "../models/Score.js";
import auth from "../middleware/auth.js";
import axios from "axios";

const router = express.Router();

// Upload scores
router.post("/upload", auth, async (req, res) => {
  try {
    if (!req.body.scores || !Array.isArray(req.body.scores)) {
      return res.status(400).json({ error: "Scores must be an array" });
    }

    const scores = req.body.scores.map((s) => ({
      subject: s.subject,
      marks: s.marks,
      userId: req.user.id,
    }));

    await Score.insertMany(scores);
    res.json({ message: "Scores uploaded successfully" });
  } catch (err) {
    console.error("Upload scores error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// Get scores for logged in user
router.get("/", auth, async (req, res) => {
  try {
    const scores = await Score.find({ userId: req.user.id });
    res.json(scores);
  } catch (err) {
    console.error("Fetch scores error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// Recommend weakest subjects / study plan
router.post("/recommend", auth, async (req, res) => {
  try {
    const scores = await Score.find({ userId: req.user.id });

    if (!scores.length) {
      return res.status(400).json({ error: "No scores found for this user" });
    }

    // Use deployed ML service URL (update `/predict` if your service differs)
    const response = await axios.post(
      `${process.env.ML_SERVICE_URL}/predict`,
      { scores }
    );

    res.json(response.data);
  } catch (err) {
    console.error("ML Service error:", err.response?.data || err.message);
    res.status(500).json({
      error: err.response?.data || "Failed to get recommendation from ML service",
    });
  }
});

export default router;
