const jwt = require("jsonwebtoken");
const User = require("../model/User");
const Admin = require("../model/Admin");

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userExists = await User.findOne({
      email,
    });
    if (userExists) {
      return res.status(400).json({
        message: "User already exists",
        status: 400,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User created successfully",
      status: 201,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        // token:
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server internal error",
      status: 500,
    });
  }
};
