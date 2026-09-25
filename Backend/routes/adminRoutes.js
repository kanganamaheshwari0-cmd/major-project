const express = require("express");

const {
  adminDashboard,
  getAllUsers,
  toggleUserBlock,
  deleteUser,
} = require("../controllers/adminController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

// ===============================
// ADMIN DASHBOARD
// ===============================

router.get(
  "/dashboard",
  authMiddleware,
  roleMiddleware("admin"),
  adminDashboard
);

// ===============================
// GET ALL USERS
// ===============================

router.get(
  "/users",
  authMiddleware,
  roleMiddleware("admin"),
  getAllUsers
);

// ===============================
// BLOCK / UNBLOCK USER
// ===============================

router.patch(
  "/users/:userId/block",
  authMiddleware,
  roleMiddleware("admin"),
  toggleUserBlock
);

// ===============================
// DELETE USER
// ===============================

router.delete(
  "/users/:userId",
  authMiddleware,
  roleMiddleware("admin"),
  deleteUser
);

module.exports = router;