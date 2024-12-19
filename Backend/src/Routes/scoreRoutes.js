
// routes/scoreRoutes.js
const express = require('express');
const router = express.Router();
const {  saveOrUpdateScore, fetchScore } = require('../Controllers/scoreController');

// POST route to create or update score
router.post('/',  saveOrUpdateScore);
router.get('/:userId', fetchScore); // Route to fetch user score


module.exports = router;
