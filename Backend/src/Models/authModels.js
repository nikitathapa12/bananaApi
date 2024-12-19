const mongoose = require('mongoose'); // Import Mongoose for MongoDB interaction
const bcrypt = require('bcryptjs'); // Import bcrypt for hashing passwords





// Define the user schema with fields for username, email, and password
const userSchema = new mongoose.Schema({
  // Data type for the username, email and password 
  username: {
    type: String, 
    required: true,
  },
  email: {
    type: String, 
    required: true, 
    unique: true, 
  },
  password: {
    type: String, 
    required: true, 
  },
});




// Middleware to hash the password before saving it to the database
userSchema.pre('save', async function (next) {
  // If the password is not modified, proceed to the next middleware
  if (!this.isModified('password')) {
    return next();
  }

  // Generate a salt for hashing the password
  const salt = await bcrypt.genSalt(10);

  // Hash the password using the generated salt
  this.password = await bcrypt.hash(this.password, salt);

  // Remove confirmPassword (if present) to prevent it from being saved
  this.confirmPassword = undefined;

  // Proceed to the next middleware or save operation
  next();
});




// Create the User model from the schema
const User = mongoose.model('authUser', userSchema);

// Export the User model for use in other parts of the application
module.exports = User;
