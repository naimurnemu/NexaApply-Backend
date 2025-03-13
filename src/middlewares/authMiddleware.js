const jwt = require("jsonwebtoken");
const User = require("../models/User");

/**
 * @desc Middleware to authenticate user routes
 * @access Private (User Routes)
 */
const authenticateUser = async (req, res, next) => {

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      let token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id);

      if (!req.user) {
        return res.status(404).json({
          message: "User not found",
          status: 404,
        });
      }

      next();
    } catch (error) {
      res.status(401).json({
        message: "Not authorized, invalid token",
        status: 401,
      });
    }
  } else
    res.status(401).json({
      message: "Not authorized, no token provided",
      status: 401,
    });
};

module.exports = authenticateUser;
