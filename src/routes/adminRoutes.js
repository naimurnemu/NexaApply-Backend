const express = require("express");
const authorizeAdmin = require("../middlewares/adminMiddleware");
const {
  getAdmins,
  addAdmin,
  removeAdmin,
} = require("../controllers/adminController");

const router = express.Router();

router.get("/", authorizeAdmin, getAdmins);
router.post("/", authorizeAdmin, addAdmin);
router.delete("/:id", authorizeAdmin, removeAdmin);

module.exports = router;
