// backend/routes/groupRoutes.js

const express = require("express");
const router = express.Router();

// Import controllers
const { createGroup, joinGroup } = require("../controllers/groupController");

// Import auth middleware
const authMiddleware = require("../middleware/authMiddleware");

// Ensure the controller functions are correctly defined
console.log("createGroup:", createGroup);
console.log("joinGroup:", joinGroup);

// Routes
router.post("/create", authMiddleware, createGroup);
router.post("/join", authMiddleware, joinGroup);

module.exports = router;
