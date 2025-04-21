const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Extract token from the Authorization header
  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' }); // Improve error message
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token with JWT_SECRET
    req.user = await User.findById(decoded.id).select('-password'); // Attach user to request object
    next(); // Proceed to next middleware or route handler
  } catch (err) {
    console.error('Token verification failed:', err); // Log the error for debugging
    res.status(401).json({ message: 'Token is invalid or expired' }); // Improved error message
  }
};
