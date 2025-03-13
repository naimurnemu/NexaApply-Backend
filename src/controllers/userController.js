const User = require("../models/User");

/**
 * @desc   Get user profile details
 * @route  GET /api/user/:id
 * @access Private (Only logged-in users can access)
 */
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (user)
      return res.status(200).json({
        message: "User profile fetched successfully",
        status: 200,
        data: user,
      });

    res.status(404).json({
      message: "User not found",
      status: 404,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server internal error",
      status: 500,
    });
  }
};

/**
 * @desc   Update user profile details
 * @route  PUT /api/user/:id
 * @access Private (Only the logged-in user can update their profile)
 */
const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;

      const updateUser = await user.save();
      return res.status(200).json({
        message: "User profile updated successfully",
        status: 200,
        data: {
          _id: updateUser._id,
          name: updateUser.name,
          email: updateUser.email,
        },
      });
    }

    res.status(404).json({
      message: "User not found",
      status: 404,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server internal error",
      status: 500,
    });
  }
};

/**
 * @desc   Delete a user (Admin only)
 * @route  DELETE /api/user/:id
 * @access Private
 */
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (user) {
      await user.remove();
      return res.status(200).json({
        message: "User deleted successfully",
        status: 200,
      });
    }

    res.status(404).json({
      message: "User not found",
      status: 404,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server internal error",
      status: 500,
    });
  }
};

module.exports = { getUserProfile, updateUserProfile, deleteUser };
