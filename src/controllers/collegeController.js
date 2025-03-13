const College = require("../models/collegeModel");

/**
 * @desc   Fetch all colleges
 * @route  GET /api/colleges
 * @access Public
 */
const getAllColleges = async (req, res) => {
  try {
    const colleges = await College.find();
    if (colleges?.length > 0)
      return res.status(200).json({
        message: "Colleges fetched successfully",
        status: 200,
        data: colleges,
      });

    res.status(404).json({ message: "No colleges found", status: 404 });
  } catch (error) {
    res.status(500).json({ message: "Server internal error", status: 500 });
  }
};

/**
 * @desc   Search College by Keyword
 * @route  GET /api/colleges/search?keyword=...
 * @access Public
 */
const searchColleges = async (req, res) => {
  try {
    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};

    const colleges = await College.find({ ...keyword });
    if (colleges.length > 0) {
      return res.status(200).json({
        message: "Colleges found successfully",
        status: 200,
        data: colleges,
      });
    }

    res.status(404).json({ message: "No colleges found", status: 404 });
  } catch (error) {
    res.status(500).json({ message: "Server internal error", status: 500 });
  }
};

/**
 * @desc   Fetch details of a specific college
 * @route  GET /api/colleges/:id
 * @access Public
 */
const getCollegeById = async (req, res) => {
  try {
    const college = await College.findById(req.params.id);
    if (college)
      return res.status(200).json({
        message: "College fetched successfully",
        status: 200,
        data: college,
      });

    res.status(404).json({
      message: "College not found",
      status: 404,
    });
  } catch (error) {
    res.status(500).json({ message: "Server internal error", status: 500 });
  }
};

/**
 * @desc   Admin adds a new college
 * @route  POST /api/colleges
 * @access Private (Admin Route)
 */
const addCollege = async (req, res) => {
  try {
    const {
      name,
      image,
      admissionDate,
      events,
      researchHistory,
      sports,
      rating,
    } = req.body;

    if (college.name === name) {
      return res.status(400).json({
        message: "College already exists",
        status: 400,
      });
    }

    const college = await College.create({
      name,
      image,
      admissionDate,
      events,
      researchHistory,
      sports,
      rating,
    });

    if (college)
      return res.status(201).json({
        message: "College added successfully",
        status: 201,
        data: college,
      });

    res.status(400).json({ message: "Invalid college data", status: 400 });
  } catch (error) {
    res.status(500).json({ message: "Server internal error", status: 500 });
  }
};

/**
 * @desc   Admin updates college details
 * @route  PUT /api/colleges/:id
 * @access Private (Admin Route)
 */
const updateCollege = async (req, res) => {
  try {
    const college = await College.findById(req.params.id);

    if (college) {
      college.name = req.body.name || college.name;
      college.image = req.body.image || college.image;
      college.admissionDate = req.body.admissionDate || college.admissionDate;
      college.events = req.body.events || college.events;
      college.researchHistory =
        req.body.researchHistory || college.researchHistory;
      college.sports = req.body.sports || college.sports;
      college.rating = req.body.rating || college.rating;

      const updatedCollege = await college.save();
      return res.status(200).json({
        message: "College updated successfully",
        status: 200,
        data: updatedCollege,
      });
    }

    res.status(404).json({ message: "College not found", status: 404 });
  } catch (error) {
    res.status(500).json({ message: "Server internal error", status: 500 });
  }
};

/**
 * @desc   Admin deletes a college
 * @route  DELETE /api/colleges/:id
 * @access Private (Admin Route)
 */
const deleteCollege = async (req, res) => {
  try {
    const college = await College.findById(req.params.id);
    if (college) {
      await college.remove();
      return res.status(200).json({
        message: "College deleted successfully",
        status: 200,
      });
    }

    res.status(404).json({ message: "College not found", status: 404 });
  } catch (error) {
    res.status(500).json({ message: "Server internal error", status: 500 });
  }
};

module.exports = {
  getAllColleges,
  searchColleges,
  getCollegeById,
  addCollege,
  updateCollege,
  deleteCollege,
};
