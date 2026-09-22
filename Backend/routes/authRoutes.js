const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const { registerUser, loginUser, getUser, studentDashboard, logoutUser } = require("../controllers/authController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/get", authMiddleware, getUser);
router.get("/student-dashboard",authMiddleware,roleMiddleware("student"),studentDashboard);
router.post("/logout/:id",authMiddleware, logoutUser);

module.exports = router;