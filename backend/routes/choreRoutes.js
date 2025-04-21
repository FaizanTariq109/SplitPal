const express = require('express');
const router = express.Router();
const {
  addChore,
  getChores,
  updateChoreStatus
} = require('../controllers/choreController');
const { authMiddleware } = require('../middleware/authMiddleware');

router.post('/', authMiddleware, addChore);
router.get('/', authMiddleware, getChores); // ?groupId=abc
router.put('/:id', authMiddleware, updateChoreStatus);

module.exports = router;
