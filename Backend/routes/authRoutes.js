
const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const {
  registerUser,
  loginUser,
  getUser,
  updateProfile,
  studentDashboard,
  logoutUser,
} = require("../controllers/authController");

const router = express.Router();

// ===============================
// REGISTER
// ===============================
router.post("/register", registerUser);

// ===============================
// LOGIN
// ===============================
router.post("/login", loginUser);

// ===============================
// GET LOGGED-IN USER
// ===============================
router.get("/get", authMiddleware, getUser);

// ===============================
// UPDATE PROFILE
// ===============================
router.patch("/profile", authMiddleware, updateProfile);

// ===============================
// STUDENT DASHBOARD
// ===============================
router.get(
  "/student-dashboard",
  authMiddleware,
  roleMiddleware("student"),
  studentDashboard
);

// ===============================
// LOGOUT
// ===============================
router.post(
  "/logout/:id",
  authMiddleware,
  logoutUser
);

module.exports = router;

