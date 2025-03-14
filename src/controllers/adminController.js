const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

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

/**
 * @desc   Login an admin
 * @route  DELETE /api/admin/login
 * @access Public
 */
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({
        message: "Admin not found",
        status: 404,
      });
    }

    if (await bcrypt.compare(password, admin.password)) {
      return res.status(200).json({
        message: "Admin logged in successfully",
        status: 200,
        data: admin,
        token: generateToken(admin._id),
      });
    }

    res.status(401).json({
      message: "Invalid password",
      status: 401,
    });
  } catch (error) {
    res.status(500).json({ message: "Server internal error", status: 500 });
  }
};

const getAdminProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id).select("-password");

    if (admin) {
      return res.status(200).json({
        message: "Admin profile fetched successfully",
        status: 200,
        data: admin,
      });
    }

    res.status(404).json({ message: "Admin not found", status: 404 });
  } catch (error) {
    res.status(500).json({ message: "Server internal error", status: 500 });
  }
};

module.exports = { getAdmins, addAdmin, removeAdmin, loginAdmin, getAdminProfile };
