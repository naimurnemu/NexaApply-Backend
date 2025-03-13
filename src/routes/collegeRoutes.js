const express = require("express");
const {
  getAllColleges,
  searchColleges,
  getCollegeById,
  addCollege,
  updateCollege,
  deleteCollege,
} = require("../controllers/collegeController");
const authorizeAdmin = require("../middlewares/adminMiddleware");

const router = express.Router();

router.get("/", getAllColleges);
router.get("/search", searchColleges);
router.get("/:id", getCollegeById);
router.post("/", authorizeAdmin, addCollege);
router.post("/:id", authorizeAdmin, updateCollege);
router.delete("/:id", authorizeAdmin, deleteCollege);

module.exports = router;
