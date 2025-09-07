const express = require('express');
const router = express.Router();
const Score = require('../models/Score');
const User = require('../models/user');

router.get('/', async (req, res) => {
  try {
    const agg = await Score.aggregate([
      { $group: { _id: "$userId", totalScore: { $sum: "$score" } } },
      { $sort: { totalScore: -1 } },
      { $limit: 10 },
    ]);


    
    const leaderboard = await Promise.all(
      agg.map(async item => {
        const user = await User.findById(item._id);
        return { name: user.name, totalScore: item.totalScore };
      })
    );
    res.json(leaderboard);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
