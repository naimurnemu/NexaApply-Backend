const Admin = require("../models/Admin");

/**
 * @desc Middleware to authenticate user routes
 * @access Private (User Routes)
 */
const authorizeAdmin = async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      let token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const adminUser = await Admin.findById(decoded.id);
      if (!adminUser) {
        return res.status(403).json({
          message: "Access denied, admin privileges required",
          status: 403,
        });
      }

      next();
    } catch (error) {
      return res.status(500).json({
        message: "Internal server error",
        status: 500,
      });
    }
  } else
    res.status(401).json({
      message: "Not authorized, no token provided",
      status: 401,
    });
};

module.exports = authorizeAdmin;
