const express = require("express");

const { updateProfile, getProfile } = require("../controllers/userController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/getAll", authMiddleware, getProfile);
router.patch("/update/:id", authMiddleware, updateProfile);

module.exports = router;