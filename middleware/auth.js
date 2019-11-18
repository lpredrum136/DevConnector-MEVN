const jwt = require('jsonwebtoken');
const config = require('config');
const jwtSecret = config.get('jwtSecret');

module.exports = (req, res, next) => {
  // Get token from the header
  const token = req.header('x-auth-token'); // Header key that we want to send along the token in, later

  // Check if not token
  if (!token)
    return res.status(401).json({ msg: 'No token, authorisation denied' });

  // If there is one, verify it
  try {
    const decoded = jwt.verify(token, jwtSecret); // Decode

    // Assign back to user, because we attach user in the payload with the header
    req.user = decoded.user; // Then we can use req.user in any of our protected routes, this req.user contains the object {id: ...}
    next(); // Go to the next middleware, this is required for all middleware
  } catch (error) {
    res.status(401).json({ msg: 'Invalid token' });
  }
};
