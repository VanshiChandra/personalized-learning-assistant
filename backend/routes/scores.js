const express = require('express');
const router = express.Router();
const Score = require('../models/Score');
const auth = require('../middleware/auth');
const axios = require('axios');

router.post('/upload', auth, async (req, res) => {
  const { scores } = req.body;
  try {
    await Score.insertMany(scores.map(s => ({ ...s, userId: req.user.id })));
    res.json({ message: "Scores uploaded successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/recommend', auth, async (req, res) => {
  try {
    const scores = await Score.find({ userId: req.user.id });
    const response = await axios.post('http://localhost:8000/recommend', { scores });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
