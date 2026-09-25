
const User = require("../models/userModel");

// ===============================
// UPDATE PROFILE
// ===============================

const updateProfile = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      name,
      phone,
      about,
      skills,
      education,
      experience,
      projects,
      github,
      linkedin,
      portfolio,
    } = req.body;

    const user = await User.findByIdAndUpdate(
      id,
      {
        name,
        phone,
        about,
        skills,
        education,
        experience,
        projects,
        github,
        linkedin,
        portfolio,
      },
      {
        returnDocument: "after",
        runValidators: true,
      }
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Profile update failed",
      error: error.message,
    });
  }
};

// ===============================
// GET PROFILE
// ===============================

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "Profile fetched successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch profile",
      error: error.message,
    });
  }
};

// ===============================
// BLOCK / UNBLOCK USER
// ===============================

const toggleBlockUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // false → true
    // true → false
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
    console.log("Block/unblock error:", error);

    res.status(500).json({
      message: "Failed to update user status",
      error: error.message,
    });
  }
};

// ===============================
// EXPORTS
// ===============================

module.exports = {
  updateProfile,
  getProfile,
  toggleBlockUser,
};

