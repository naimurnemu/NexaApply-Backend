const Admission = require("../model/Admission");
const College = require("../model/College");

/**
 * @desc   Submit an admission form
 * @route  POST /api/admission
 * @access Private (User Routes)
 */
const submitAdmission = async (req, res) => {
  try {
    const {
      collegeId,
      candidateName,
      subject,
      email,
      phone,
      address,
      dateOfBirth,
      image,
    } = req.body;

    const admission = await Admission.create({
      userId: req.user.id,
      collegeId,
      candidateName,
      subject,
      email,
      phone,
      address,
      dateOfBirth,
      image,
    });

    if (admission)
      return res.status(201).json({
        message: "Admission form submitted successfully",
        status: 201,
        data: admission,
      });

    res.status(400).json({ message: "Invalid admission data", status: 400 });
  } catch (error) {
    res.status(500).json({ message: "Server internal error", status: 500 });
  }
};

/**
 * @desc   Fetch applied college details for a user
 * @route  GET /api/my-college/:userId
 * @access Private (User only)
 */
const getUserAdmissions = async (req, res) => {
  try {
    const admissions = await Admission.find({ userId: req.user.id }).populate(
      "collegeId"
    );

    if (admissions)
      return res.status(200).json({
        message: "User admissions fetched successfully",
        status: 200,
        data: admissions,
      });

    res.status(404).json({ message: "No admissions found", status: 404 });
  } catch (error) {
    res.status(500).json({ message: "Server internal error", status: 500 });
  }
};

module.exports = { submitAdmission, getUserAdmissions };
