const jwt = require("jsonwebtoken");
const User = require("../model/User");
const Admin = require("../model/Admin");

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify("token", process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id);

      if (!req.user) {
        return res.status(404).json({
          message: "User not found",
          status: 404,
        });
      }

      next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({
        message: "Not authorized, token failed",
        status: 401,
      });
    }
  }

  if (!token) {
    return res.status(401).json({
      message: "Not authorized, no token",
      status: 401,
    });
  }
};

const isAdmin = async (req, res, next) => {
  try {
    const adminUser = await Admin.findById(req.user.id);
    if (!adminUser) {
      return res.status(401).json({
        message: "Not authorized as an admin",
        status: 401,
      });
    }
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server internal error",
      status: 500,
    });
  }
};

module.exports = { protect, isAdmin };
