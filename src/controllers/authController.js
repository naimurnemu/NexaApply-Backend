const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { OAuth2Client } = require("google-auth-library");
const sendEmail = require("../utils/sendEmail");
const generateToken = require("../utils/generateToken");

/**
 * @desc   Register a new user
 * @route  POST /api/auth/register
 * @access Public
 */
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({
      email,
    });
    if (userExists) {
      return res.status(400).json({
        message: "User already exists",
        status: 400,
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    if (user)
      return res.status(201).json({
        message: "User created successfully",
        status: 201,
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
          token: generateToken(user._id),
        },
      });

    res.status(400).json({
      message: "Invalid user data",
      status: 400,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server internal error",
      status: 500,
    });
  }
};

/**
 * @desc   Authenticate user and log in
 * @route  POST /api/auth/login
 * @access Public
 */
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({
        message: "User not found",
        status: 404,
      });

    if (await bcrypt.compare(password, user.password)) {
      return res.status(200).json({
        message: "User logged in successfully",
        status: 200,
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
          token: generateToken(user._id),
        },
      });
    }

    res.status(401).json({
      message: "Invalid Password",
      status: 401,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server internal error",
      status: 500,
    });
  }
};

/**
 * @desc   Google Authentication
 * @route  POST /api/auth/google
 * @access Public
 */
// const googleAuth = async (req, res) => {
//   try {
//     const { tokenId } = req.body;

//     const ticket = await client.verifyIdToken({
//       idToken: tokenId,
//       audience: process.env.GOOGLE_CLIENT_ID,
//     });

//     const { email, name, sub } = ticket.getPayload();

//     let user = await User.findOne({ email });

//     if (!user) {
//       user = await User.create({
//         name,
//         email,
//         password: sub,
//       });
//     }

//     res.json({
//       _id: user.id,
//       name: user.name,
//       email: user.email,
//       token: generateToken(user.id),
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Google authentication failed", error });
//   }
// };

/**
 * @desc   Forgot user password
 * @route  POST /api/auth/forgot-password
 * @access Public
 */
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        status: 404,
      });
    }

    const resetToken = generateToken(user._id);
    const resetUrl = `${req.protocol}://${req.get(
      "host"
    )}/api/auth/reset-password/${resetToken}`;

    await sendEmail(
      email,
      "Password Reset Request",
      `You have requested to reset your password. Please make a PUT request to: ${resetUrl}`
    );

    res.status(200).json({
      message: "Password reset link sent to email",
      status: 200,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server internal error",
      status: 500,
    });
  }
};

/**
 * @desc   Reset user password
 * @route  POST /api/auth/reset-password/:token
 * @access Public
 */
const resetPassword = async (req, res) => {
  try {
    const resetToken = req.params.token;
    const { newPassword } = req.body;

    const decoded = jwt.verify(resetToken, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        status: 404,
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    await user.save();

    await sendEmail(
      user.email,
      "Password Reset",
      `Your password has been reset for ${user.email}`
    );

    res.json({
      message: "Password reset successfully",
      status: 200,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server internal error",
      status: 500,
    });
  }
};

module.exports = { registerUser, loginUser, forgotPassword, resetPassword };
