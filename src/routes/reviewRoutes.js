const express = require('express');
const authenticateUser = require('../middlewares/authMiddleware');
const { addReview, getCollegeReviews } = require('../controllers/reviewController');

const router = express.Router();

router.post('/', authenticateUser, addReview);
router.get('/:collegeId', getCollegeReviews);

module.exports = router;
