const express = require('express');
const router = express.Router();

// Import the entire birthdayController object
const birthdayController = require('../controllers/birthdayController');
const { authMiddleware } = require('../middleware/authMiddleware');

// Use the functions directly from birthdayController
router.post('/add', authMiddleware, birthdayController.addBirthday);
router.get('/upcoming', authMiddleware, birthdayController.getUpcomingBirthdays);

module.exports = router;
