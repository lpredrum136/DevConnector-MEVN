const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth'); // Middleware auth
const { check, validationResult } = require('express-validator');
const config = require('config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// User model
const User = require('../../models/User');

// @route GET api/auth
// @desc Authenticate to check if user is logged in
// @access Private
router.get('/', auth, async (req, res) => {
  // Add "auth" makes this route protected
  try {
    const user = await User.findById(req.user.id).select('-password'); //This req.user is from middleware auth, which contains the id of user
    //-password leaves the password behind when generating the user instance
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// @route POST api/auth
// @desc Authenticate user, login and get token
// @access Public
router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email: email });

      if (!user)
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid credentials' }] });

      // Match user and password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid credentials' }] });

      // If everything is ok
      const payload = {
        user: {
          id: user.id
        }
      };

      const jwtSecret = config.get('jwtSecret');

      jwt.sign(payload, jwtSecret, { expiresIn: 360000 }, (error, token) => {
        if (error) throw error;
        res.json({ token: token });
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
