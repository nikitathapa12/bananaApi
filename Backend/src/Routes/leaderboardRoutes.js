const express = require('express');
const { fetchLeaderboard } = require('../Controllers/scoreController');

const router = express.Router();

// Leaderboard endpoint
router.get('/', fetchLeaderboard);

module.exports = router;
