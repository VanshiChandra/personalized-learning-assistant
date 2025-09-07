import express from "express";
import Score from "../models/Score.js";
import auth from "../middleware/auth.js";
import axios from "axios";

const router = express.Router();

// Upload scores
router.post("/upload", auth, async (req, res) => {
  try {
    const scores = req.body.scores.map(s => ({ ...s, userId: req.user.id }));
    await Score.insertMany(scores);
    res.json({ message: "Scores uploaded successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get scores for logged in user
router.get("/", auth, async (req, res) => {
  try {
    const scores = await Score.find({ userId: req.user.id });
    res.json(scores);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Recommend weakest subjects / study plan
router.post("/recommend", auth, async (req, res) => {
  try {
    const scores = await Score.find({ userId: req.user.id });

    // Use your deployed ML service URL here
    const response = await axios.post(
      "https://giving-tenderness-production.up.railway.app", 
      { scores }
    );

    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
