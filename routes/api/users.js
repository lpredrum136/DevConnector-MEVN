const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwtSecret = config.get('jwtSecret');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

// User model
const User = require('../../models/User');

// @route POST api/users
// @desc Register user
// @access Public
router.post(
  '/',
  [
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // If there is error
      // Using return here will cause any code after not to be run
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;
    try {
      // See if user exists
      let user = await User.findOne({ email: email });
      if (user)
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });

      // Otherwise, default action
      // Get user's gravatar
      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm'
      });

      // Create new instance of User
      user = new User({
        name: name,
        email: email,
        avatar: avatar,
        password: password
      });

      // Encrypt password and save user
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();

      // Return jsonwebtoken
      const payload = {
        user: {
          id: user.id // user up there
        }
      };

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
