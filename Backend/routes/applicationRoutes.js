const express = require("express");

const {
  applyForJob,
  getMyApplications,
  getApplicants,
  updateApplicationStatus,
} = require("../controllers/applicationController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// My Applications
router.get(
  "/my-applications",
  authMiddleware,
  getMyApplications
);

// Recruiter - Get Applicants
router.get(
  "/applicants",
  authMiddleware,
  getApplicants
);

// Apply for Job
router.post(
  "/:jobId",
  authMiddleware,
  applyForJob
);

router.patch(
  "/:applicationId/status",
  authMiddleware,
  updateApplicationStatus
);

module.exports = router;