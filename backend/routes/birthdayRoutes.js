const express = require("express");
const router = express.Router();

const {
  addBirthday,
  getUpcomingBirthdays,
} = require("../controllers/birthdayController");

const authMiddleware = require("../middleware/authMiddleware");

router.post("/add", authMiddleware, addBirthday);
router.get("/upcoming", authMiddleware, getUpcomingBirthdays);

module.exports = router;