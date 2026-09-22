const User = require("../models/userModel");

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

module.exports = {
  updateProfile, getProfile
};