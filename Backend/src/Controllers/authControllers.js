const User = require('../Models/authModels');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');


dotenv.config(); // Load environment variables

const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    } 

    user = new User({
      username,
      email,
      password,
    
      
    });

    await user.save();

   

    const payload = {
      user: {
        id: user.id,
      },
    };

    // Generate JWT token and send the response
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '24h' },
      (err, token) => {
        if (err) {
          return res.status(500).json({ msg: 'Error generating token' });
        }

        res.status(201).json({
          msg: "User registered successfully",
          token,
          userDetails: user,
      
        });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    // Generate JWT token and send the response
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '24h' },
      (err, token) => {
        if (err) {
          return res.status(500).json({ msg: 'Error generating token' });
        }

        res.json({
          msg: "User login successful",
          token,
          userDetails: user,
        });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};


module.exports = {
  register,
  login, 
};