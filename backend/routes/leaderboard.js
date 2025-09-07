import express from 'express';
const router = express.Router();
const Score = require('../models/Score');
const auth = require('../middleware/auth');

// Leaderboard
router.get('/', async (req, res) => {
  try {
    const leaderboard = await Score.aggregate([
      { $group: { _id: '$userId', totalScore: { $sum: '$score' } } },
      { $sort: { totalScore: -1 } },
      { $limit: 10 }
    ]);
    res.json(leaderboard);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Chart data for user
router.get('/chart-data', auth, async (req, res) => {
  try {
    const scores = await Score.find({ userId: req.user.id });
    res.json(scores);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
