const User = require("../models/userModel");
const Job = require("../models/jobModel");
const Application = require("../models/applicationModel");

// ===============================
// ADMIN DASHBOARD
// ===============================

const adminDashboard = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();

    const totalStudents = await User.countDocuments({
      role: "student",
    });

    const totalRecruiters = await User.countDocuments({
      role: "recruiter",
    });

    const totalJobs = await Job.countDocuments();

    const totalApplications =
      await Application.countDocuments();

    res.status(200).json({
      message: "Admin dashboard data fetched successfully",

      stats: {
        totalUsers,
        totalStudents,
        totalRecruiters,
        totalJobs,
        totalApplications,
      },
    });
  } catch (error) {
    console.log("Admin dashboard error:", error);

    res.status(500).json({
      message: "Failed to fetch admin dashboard",
      error: error.message,
    });
  }
};

// ===============================
// GET ALL USERS
// ===============================

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select("-password -revokedTokens")
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "Users fetched successfully",
      users,
    });
  } catch (error) {
    console.log("Get users error:", error);

    res.status(500).json({
      message: "Failed to fetch users",
      error: error.message,
    });
  }
};

// ===============================
// BLOCK / UNBLOCK USER
// ===============================

const toggleUserBlock = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Admin ko khud block nahi karna
    if (user._id.toString() === req.user.id) {
      return res.status(400).json({
        message: "You cannot block yourself",
      });
    }

    user.isBlocked = !user.isBlocked;

    await user.save();

    res.status(200).json({
      message: user.isBlocked
        ? "User blocked successfully"
        : "User unblocked successfully",

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isBlocked: user.isBlocked,
      },
    });
  } catch (error) {
    console.log("Toggle block error:", error);

    res.status(500).json({
      message: "Failed to update user status",
      error: error.message,
    });
  }
};

// ===============================
// DELETE USER
// ===============================

const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Admin khud ko delete nahi kar sakta
    if (user._id.toString() === req.user.id) {
      return res.status(400).json({
        message: "You cannot delete yourself",
      });
    }

    await User.findByIdAndDelete(userId);

    res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (error) {
    console.log("Delete user error:", error);

    res.status(500).json({
      message: "Failed to delete user",
      error: error.message,
    });
  }
};

// ===============================
// EXPORTS
// ===============================

module.exports = {
  adminDashboard,
  getAllUsers,
  toggleUserBlock,
  deleteUser,
};