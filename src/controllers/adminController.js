const Admin = require("../models/Admin");

/**
 * @desc   Get all admins
 * @route  GET /api/admins
 * @access Admin only
 */
const getAdmins = async (req, res) => {
  try {
    const admins = await Admin.find();

    if (admins)
      return res.status(200).json({
        message: "Admins fetched successfully",
        status: 200,
        data: admins,
      });

    res.status(404).json({ message: "No admins found", status: 404 });
  } catch (error) {
    res.status(500).json({ message: "Server internal error", status: 500 });
  }
};

/**
 * @desc   Create a new admin
 * @route  POST /api/admins
 * @access Admin only
 */
const addAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const admin = await Admin.create({ name, email, password, isAdmin: true });

    if (admin)
      return res.status(201).json({
        message: "Admin created successfully",
        status: 201,
        data: admin,
      });

    res.status(400).json({ message: "Invalid admin data", status: 400 });
  } catch (error) {
    res.status(500).json({ message: "Server internal error", status: 500 });
  }
};

/**
 * @desc   Remove an admin (cannot delete self)
 * @route  DELETE /api/admins/:id
 * @access Admin only
 */
const removeAdmin = async (req, res) => {
  try {
    const adminId = req.params.id;
    if (adminId === req.admin.id)
      return res.status(400).json({
        message: "Cannot delete self",
        status: 400,
      });

    const admin = await Admin.findById(adminId);

    if (admin) {
      admin.remove();
      return res.status(200).json({
        message: "Admin deleted successfully",
        status: 200,
        data: admin,
      });
    }

    res.status(404).json({ message: "Admin not found", status: 404 });
  } catch (error) {
    res.status(500).json({ message: "Server internal error", status: 500 });
  }
};

module.exports = { getAdmins, addAdmin, removeAdmin };
