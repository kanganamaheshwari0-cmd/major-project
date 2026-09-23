const Job = require("../models/jobModel");

// Create Job
const createJob = async (req, res) => {
  try {
    const {
      title,
      description,
      company,
      location,
      salary,
      skills,
      employment,
    } = req.body;

    const job = await Job.create({
      title,
      description,
      company,
      location,
      salary,
      skills,
      employment,
      createdBy: req.user.id,
    });

    res.status(201).json({
      message: "Job created successfully",
      job,
    });
  } catch (error) {
    res.status(500).json({
      message: "Job creation failed",
      error: error.message,
    });
  }
};

// Get All Jobs

const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find({
      isDeleted: { $ne: true },
      status: "active",
    })
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "Jobs fetched successfully",
      jobs,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch jobs",
      error: error.message,
    });
  }
};

const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate("createdBy", "name email");

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    res.status(200).json({
      message: "Job fetched successfully",
      job,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch job",
      error: error.message,
    });
  }
};

const updateJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    res.status(200).json({
      message: "Job updated successfully",
      job,
    });
  } catch (error) {
    res.status(500).json({
      message: "Job update failed",
      error: error.message,
    });
  }
};

const deleteJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(
      req.params.id,
      {
        isDeleted: true,
        status: "inactive",
      },
      {
        new: true,
      }
    );

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    res.status(200).json({
      message: "Job deleted successfully",
      job,
    });
  } catch (error) {
    res.status(500).json({
      message: "Job deletion failed",
      error: error.message,
    });
  }
};


module.exports = {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
};