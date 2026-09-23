const express = require("express");

const {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
} = require("../controllers/jobController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

// Get all jobs
router.get("/", authMiddleware, getAllJobs);

router.get("/:id", authMiddleware, getJobById);

// Create job
router.post(
  "/",
  authMiddleware,
  roleMiddleware("recruiter"),
  createJob
);

router.patch(
  "/:id",
  authMiddleware,
  roleMiddleware("recruiter"),
  updateJob
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("recruiter"),
  deleteJob
);

module.exports = router;