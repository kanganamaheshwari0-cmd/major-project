const Application = require("../models/applicationModel");
const Job = require("../models/jobModel");

// =====================================================
// APPLY FOR JOB
// =====================================================

const applyForJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    // Check job exists
    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    // Check already applied
    const existingApplication =
      await Application.findOne({
        job: jobId,
        applicant: req.user.id,
      });

    if (existingApplication) {
      return res.status(400).json({
        message:
          "You have already applied for this job",
      });
    }

    // Create application
    const application = await Application.create({
      job: jobId,
      applicant: req.user.id,
      status: "Applied",
    });

    res.status(201).json({
      message: "Job applied successfully",
      application,
    });
  } catch (error) {
    console.log("Apply job error:", error);

    res.status(500).json({
      message: "Application failed",
      error: error.message,
    });
  }
};

// =====================================================
// GET MY APPLICATIONS
// =====================================================

const getMyApplications = async (req, res) => {
  try {
    const applications =
      await Application.find({
        applicant: req.user.id,
      })
        .populate(
          "job",
          "title company location salary employment skills"
        )
        .sort({ createdAt: -1 });

    res.status(200).json({
      message:
        "Applications fetched successfully",
      applications,
    });
  } catch (error) {
    console.log(
      "My applications error:",
      error
    );

    res.status(500).json({
      message:
        "Failed to fetch applications",
      error: error.message,
    });
  }
};

// =====================================================
// GET APPLICANTS FOR RECRUITER'S JOBS
// =====================================================

const getApplicants = async (req, res) => {
  try {
    const applications =
      await Application.find()
        .populate(
          "job",
          "title company location salary employment createdBy"
        )
        .populate(
          "applicant",
          "fullName email"
        )
        .sort({ createdAt: -1 });

    // Only applications for jobs
    // created by logged-in recruiter
    const myApplications =
      applications.filter(
        (application) =>
          application.job &&
          application.job.createdBy &&
          application.job.createdBy.toString() ===
            req.user.id
      );

    res.status(200).json({
      message: "Applicants fetched successfully",
      applications: myApplications,
    });
  } catch (error) {
    console.log(
      "Applicants error:",
      error
    );

    res.status(500).json({
      message:
        "Failed to fetch applicants",
      error: error.message,
    });
  }
};

// =====================================================
// UPDATE APPLICATION STATUS
// =====================================================

const updateApplicationStatus = async (
  req,
  res
) => {
  try {
    const { applicationId } =
      req.params;

    const { status } = req.body;

    // Allowed statuses
    const allowedStatuses = [
      "Applied",
      "Shortlisted",
      "Interview",
      "Selected",
      "Rejected",
    ];

    // Validate status
    if (
      !allowedStatuses.includes(status)
    ) {
      return res.status(400).json({
        message:
          "Invalid application status",
      });
    }

    // Find application
    const application =
      await Application.findById(
        applicationId
      ).populate(
        "job",
        "createdBy"
      );

    if (!application) {
      return res.status(404).json({
        message:
          "Application not found",
      });
    }

    // Check job exists
    if (!application.job) {
      return res.status(404).json({
        message:
          "Job associated with application not found",
      });
    }

    // Check recruiter owns this job
    if (
      application.job.createdBy.toString() !==
      req.user.id
    ) {
      return res.status(403).json({
        message:
          "You are not allowed to update this application",
      });
    }

    // Update status
    application.status = status;

    await application.save();

    res.status(200).json({
      message:
        "Application status updated successfully",
      application,
    });
  } catch (error) {
    console.log(
      "Status update error:",
      error
    );

    res.status(500).json({
      message:
        "Failed to update application status",
      error: error.message,
    });
  }
};

// =====================================================
// ADMIN - GET ALL APPLICATIONS
// =====================================================

const getAllApplications = async (req, res) => {
  try {
    const applications = await Application.find()
      .populate(
        "job",
        "title company location salary employment"
      )
      .populate(
        "applicant",
        "name email phone"
      )
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "All applications fetched successfully",
      applications,
    });
  } catch (error) {
    console.log("Admin applications error:", error);

    res.status(500).json({
      message: "Failed to fetch all applications",
      error: error.message,
    });
  }
};


// =====================================================
// EXPORT
// =====================================================

module.exports = {
  applyForJob,
  getMyApplications,
  getApplicants,
  updateApplicationStatus,
  getAllApplications,
};