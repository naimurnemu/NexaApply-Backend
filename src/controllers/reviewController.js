const Review = require("../model/Review");
const College = require("../model/College");
const User = require("../model/User");

/**
 * @desc   Add a review for a college
 * @route  POST /api/reviews
 * @access Private (User only)
 */
const addReview = async (req, res) => {
  try {
    const { userId, collegeId, rating, comment } = req.body;

    const college = await College.findById(collegeId);
    if (!college)
      return res.status(404).json({
        message: "College not found",
        status: 404,
      });

    const review = await Review.create({
      userId,
      collegeId,
      rating,
      comment,
    });

    if (review)
      return res.status(201).json({
        message: "Review added successfully",
        status: 201,
        data: review,
      });

    res.status(400).json({
      message: "Invalid review data",
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
 * @desc   Fetch reviews for a specific college
 * @route  GET /api/reviews/:collegeId
 * @access Public
 */
const getCollegeReviews = async (req, res) => {
  try {
    const reviews = await Review.find({
      collegeId: req.params.collegeId,
    }).populate("userId");

    if (reviews)
      return res.status(200).json({
        message: "College reviews fetched successfully",
        status: 200,
        data: reviews,
      });

    res.status(404).json({
      message: "Reviews not found",
      status: 404,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server internal error",
      status: 500,
    });
  }
};

module.exports = { addReview, getCollegeReviews };
