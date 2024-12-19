const mongoose = require('mongoose');

// Define the schema for storing user scores
const scoreSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId, // Reference to the User model
      required: true, // This field is mandatory
      ref: 'User', // Specifies the related collection
    },
    lastScore: {
      type: Number, // Stores the user's most recent game score
      required: true, // This field is mandatory
      default: 0, // Default value if not provided
    },
    highScore: {
      type: Number, // Stores the user's highest score achieved
      required: true, // This field is mandatory
      default: 0, // Default value if not provided
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Create the Score model based on the scoreSchema
const Score = mongoose.model('Score', scoreSchema);

// Export the Score model to use it in other parts of the application
module.exports = Score;
