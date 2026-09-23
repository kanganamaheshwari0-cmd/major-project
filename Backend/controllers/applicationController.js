const Application = require("../models/applicationModel");
const Job = require("../models/jobModel");

// Apply for Job
const applyForJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    const existingApplication =
      await Application.findOne({
        job: jobId,
        applicant: req.user.id,
      });

    if (existingApplication) {
      return res.status(400).json({
        message: "You have already applied for this job",
      });
    }

    const application = await Application.create({
      job: jobId,
      applicant: req.user.id,
    });

    res.status(201).json({
      message: "Job applied successfully",
      application,
    });
  } catch (error) {
    res.status(500).json({
      message: "Application failed",
      error: error.message,
    });
  }
};


// Get My Applications
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
      message: "Applications fetched successfully",
      applications,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch applications",
      error: error.message,
    });
  }
};


// Get Applicants for Recruiter's Jobs
const getApplicants = async (req, res) => {
  try {
    const applications = await Application.find()
      .populate(
        "job",
        "title company location salary employment createdBy"
      )
      .populate(
        "applicant",
        "fullName email"
      )
      .sort({ createdAt: -1 });

    const myApplications = applications.filter(
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
    console.log("Applicants error:", error);

    res.status(500).json({
      message: "Failed to fetch applicants",
      error: error.message,
    });
  }
};

// Update Application Status
const updateApplicationStatus = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { status } = req.body;

    const allowedStatuses = [
      "Applied",
      "Shortlisted",
      "Interview",
      "Selected",
      "Rejected",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid application status",
      });
    }

    const application = await Application.findById(
      applicationId
    ).populate("job", "createdBy");

    if (!application) {
      return res.status(404).json({
        message: "Application not found",
      });
    }

    // Check that logged-in recruiter owns the job
    if (
      application.job.createdBy.toString() !==
      req.user.id
    ) {
      return res.status(403).json({
        message: "You are not allowed to update this application",
      });
    }

    application.status = status;

    await application.save();

    res.status(200).json({
      message: "Application status updated successfully",
      application,
    });
  } catch (error) {
    console.log("Status update error:", error);

    res.status(500).json({
      message: "Failed to update application status",
      error: error.message,
    });
  }
};


module.exports = {
  applyForJob,
  getMyApplications,
  getApplicants,
  updateApplicationStatus,
};