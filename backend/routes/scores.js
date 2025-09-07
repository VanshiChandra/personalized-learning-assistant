import express from 'express';
const router = express.Router();
const Score = require('../models/Score'); // Model stays Score
const auth = require('../middleware/auth');
const axios = require('axios');

// Upload scores
router.post('/upload', auth, async (req, res) => {
  const { scores } = req.body;
  try {
    await Score.insertMany(scores.map(s => ({ ...s, userId: req.user.id })));
    res.json({ message: 'Scores uploaded successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get recommendations from ML service
router.get('/recommend', auth, async (req, res) => {
  try {
    const scores = await Score.find({ userId: req.user.id });
    const response = await axios.post(`${process.env.ML_SERVICE_URL}/recommend`, { scores });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
