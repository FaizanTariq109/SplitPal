const express = require("express");
const router = express.Router();
const { sendMessage, getMessages } = require("../controllers/chatController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, sendMessage);
router.get("/:groupId", authMiddleware, getMessages);

module.exports = router;
