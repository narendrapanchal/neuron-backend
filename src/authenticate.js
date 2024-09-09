const jwt = require('jsonwebtoken');
const { User } = require("./model/user.model");
const JWT_SECRET = process.env.JWT_SECRET || "secret_key";  // Use env variable or fallback to "secret_key"

// Middleware to authenticate user and check for admin role
const authenticate = (req, res, next) => {
  // Extract the token from the Authorization header
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(403).json({ message: 'Forbidden - No token provided' });
  }

  // Verify the token
  jwt.verify(token, JWT_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized - Invalid token' });
    }

    const { userId, role } = decoded;

    // Check if the role is admin
    if (role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden - Admins only' });
    }

    try {
      next();
    } catch (err) {
      return res.status(403).json({ message: 'Forbidden - Insufficient privileges' });
    }
  });
};

module.exports = authenticate;
