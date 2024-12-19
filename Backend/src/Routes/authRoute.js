const express = require('express'); // Import Express framework
const { register, login } = require('../Controllers/authControllers'); // Import register and login controller functions

const router = express.Router(); // Create an Express router instance

// Route to handle user registration

router.post('/register', register);


// The '/login' endpoint is mapped to the `login` function in authControllers
router.post('/login', login);



// Export the router for use in other parts of the application
module.exports = router;
