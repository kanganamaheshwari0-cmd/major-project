
const express = require("express");

const {
  applyForJob,
  getMyApplications,
  getApplicants,
  updateApplicationStatus,
  getAllApplications,
} = require("../controllers/applicationController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

// =====================================================
// ADMIN - GET ALL APPLICATIONS
// =====================================================

router.get(
  "/all",
  authMiddleware,
  roleMiddleware("admin"),
  getAllApplications
);

// =====================================================
// STUDENT - MY APPLICATIONS
// =====================================================

router.get(
  "/my-applications",
  authMiddleware,
  getMyApplications
);

// =====================================================
// RECRUITER - GET APPLICANTS
// =====================================================

router.get(
  "/applicants",
  authMiddleware,
  getApplicants
);

// =====================================================
// STUDENT - APPLY FOR JOB
// =====================================================

router.post(
  "/:jobId",
  authMiddleware,
  applyForJob
);

// =====================================================
// RECRUITER - UPDATE APPLICATION STATUS
// =====================================================

router.patch(
  "/:applicationId/status",
  authMiddleware,
  updateApplicationStatus
);

module.exports = router;

