const express = require('express');
const authenticateUser = require('../middlewares/authMiddleware');
const { submitAdmission, getUserAdmissions } = require('../controllers/admissionController');

const router = express.Router();

router.post('/', authenticateUser, submitAdmission);
router.get('/my-college/:userId', authenticateUser, getUserAdmissions);

module.exports = router;
