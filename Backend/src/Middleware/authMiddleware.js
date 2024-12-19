const jwt = require('jsonwebtoken'); // Import JSON Web Token library for token handling
const dotenv = require('dotenv'); // Import dotenv to manage environment variables

dotenv.config(); // Load environment variables from .env file



// Middleware function to handle user authentication
const authMiddleware = (req, res, next) => {
  // Extract the Authorization header from the incoming request
  const authHeader = req.headers.authorization;



  // If no Authorization header is present, deny access
  if (!authHeader) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }


  
  // Remove the "Bearer " prefix to get the token
  const token = authHeader.replace('Bearer ', '');

  // If token is missing, deny access
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    // Verify the token using the secret key from environment variables
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the decoded user information to the request object
    req.user = decoded.user;

    // Proceed to the next middleware or route handler
    next();
  } catch (err) {
    // If token verification fails, return an error
    res.status(401).json({ msg: 'Token is not valid' });
  }
};



// Export the middleware to use it in protected routes
module.exports = authMiddleware;
