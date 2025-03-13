const express = require("express");
const {
  getUserProfile,
  updateUserProfile,
  deleteUser,
} = require("../controllers/userController");
const authenticateUser = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/:id", authenticateUser, getUserProfile);
router.put("/:id", authenticateUser, updateUserProfile);
router.delete("/:id", authenticateUser, deleteUser);

module.exports = router;