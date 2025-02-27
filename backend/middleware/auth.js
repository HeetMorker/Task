const jwt = require('jsonwebtoken');
const User = require('../models/User.model');

const authMiddleware = (roles = []) => {
  return async (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id);

      if (roles.length && !roles.includes(req.user.role)) {
        return res.status(403).json({ message: 'Permission denied' });
      }
      next();
    } catch (err) {
      res.status(401).json({ message: 'Token is not valid' });
    }
  };
};

module.exports = authMiddleware;
