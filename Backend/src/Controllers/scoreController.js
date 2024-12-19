const Score = require('../Models/scoreModel');

// Controller to create or update score
const saveOrUpdateScore = async (req, res) => {
  try {
    const { userId, score } = req.body;

    // Ensure userId and score are provided
    if (!userId || score === undefined) {
      return res.status(400).json({ message: 'userId and gamescore are required' });
    }

    // check if a score record exists for the user
    let scoreRecord = await Score.findOne({ userId });

    if (scoreRecord) {
      // Update lastScore and highScore if a record exists
      scoreRecord.lastScore = score;
      if (score > scoreRecord.highScore) {
        scoreRecord.highScore = score;
      }
      await scoreRecord.save();
      return res.status(200).json({
        message: 'Score updated successfully',
        lastScore: scoreRecord.lastScore,
        highScore: scoreRecord.highScore,
      });
    } else {
      // Create new record with lastScore and highScore set to the new score
      const newScoreRecord = new Score({ userId, lastScore: score, highScore: score });
      await newScoreRecord.save();
      return res.status(201).json({
        message: 'Score created successfully',
        lastScore: newScoreRecord.lastScore,
        highScore: newScoreRecord.highScore,
      });
    }
  } catch (error) {
    console.error('Error saving/updating score:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};


// Controller to retrieve a player's score by their ID
const fetchScore = async (req, res) => {
  try {
    const { userId } = req.params;

     // Validate input
    if (!userId) {
      return res.status(400).json({ message: 'UserId is required' });
    }
    const scoreRecord = await Score.findOne({ userId });

   
    if (!scoreRecord) {
      return res.status(404).json({ message: 'Score not found for the user' });
    }

    return res.status(200).json(scoreRecord);
  } catch (error) {
    console.error('Error fetching score:',error);
    return res.status(500).json({ message: 'Server error' });
  }
};



// Controller to retrieve the leaderboard
const fetchLeaderboard = async (req, res) => {
  try {
    const leaderboard = await Score.aggregate([
      // Sort by highScore in descending order
      { $sort: { highScore: -1 } },
      
      // Limit to top 100 scores
      { $limit: 100 },
      
      // join with User collection
      {
        $lookup: {
          from: 'authusers', // Ensure this matches your actual users collection name
          localField: 'userId',
          foreignField: '_id',
          as: 'userDetails'
        }
      },
      
      // Unwind the userDetails
      { $unwind: { 
        path: '$userDetails', 
        preserveNullAndEmptyArrays: true 
      }},
    
      
      // Project the output
      // Default to anonymous if username missing
      {
        $project: {
          username: { 
            $ifNull: [
              '$userDetails.username', 
              'Unknown Player' 
            ]
          },
          highScore: 1,
          userId: 1
        }
      }
    ]);

  

    if (leaderboard.length === 0) {
      return res.status(404).json({ 
        message: 'No score available',
        details: 'Leaderboard is empty'
      });
    }

    return res.status(200).json(leaderboard);
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    return res.status(500).json({ 
      message: 'Server error ',
      error: error.message 
    });
  }
};

// Export the controllers
module.exports = {
  saveOrUpdateScore,
  fetchScore,
  fetchLeaderboard
};
