const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// REGISTER USER
const registerUser = async (req, res) => {
  try {
    const { name, email, password, phone, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email and password are required",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
      role,
    });

    res.status(201).json({
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Registration failed",
      error: error.message,
    });
  }
};

// ===============================
// LOGIN USER
// ===============================
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    if (user.isBlocked) {
      return res.status(403).json({
        message: "Your account has been blocked",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        profilePicture: user.profilePicture,
        about: user.about,
        skills: user.skills,
        education: user.education,
        experience: user.experience,
        projects: user.projects,
        github: user.github,
        linkedin: user.linkedin,
        portfolio: user.portfolio,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Login failed",
      error: error.message,
    });
  }
};

// ===============================
// GET CURRENT USER
// ===============================
const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "User data fetched successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch user",
      error: error.message,
    });
  }
};

// UPDATE PROFILE
const updateProfile = async (req, res) => {
  try {
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

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (name !== undefined) {
      user.name = name;
    }

    if (phone !== undefined) {
      user.phone = phone;
    }

    if (about !== undefined) {
      user.about = about;
    }

    if (skills !== undefined) {
      user.skills = skills;
    }

    if (education !== undefined) {
      user.education = education;
    }

    if (experience !== undefined) {
      user.experience = experience;
    }

    if (projects !== undefined) {
      user.projects = projects;
    }

    if (github !== undefined) {
      user.github = github;
    }

    if (linkedin !== undefined) {
      user.linkedin = linkedin;
    }

    if (portfolio !== undefined) {
      user.portfolio = portfolio;
    }

    await user.save();

    res.status(200).json({
      message: "Profile updated successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        profilePicture: user.profilePicture,
        about: user.about,
        skills: user.skills,
        education: user.education,
        experience: user.experience,
        projects: user.projects,
        github: user.github,
        linkedin: user.linkedin,
        portfolio: user.portfolio,
      },
    });
  } catch (error) {
    console.log("Profile update error:", error);

    res.status(500).json({
      message: "Failed to update profile",
      error: error.message,
    });
  }
};

// STUDENT DASHBOARD
const studentDashboard = (req, res) => {
  res.status(200).json({
    message: "Welcome to Student Dashboard",
    user: req.user,
  });
};

// LOGOUT USER
const logoutUser = async (req, res) => {
  try {
    const { id } = req.params;

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Token required",
      });
    }

    const token = authHeader.split(" ")[1];

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (!user.revokedTokens.includes(token)) {
      user.revokedTokens.push(token);
    }

    await user.save();

    res.status(200).json({
      message: "Logout successful",
    });
  } catch (error) {
    res.status(500).json({
      message: "Logout failed",
      error: error.message,
    });
  }
};

// EXPORTS
module.exports = {
  registerUser,
  loginUser,
  getUser,
  updateProfile,
  studentDashboard,
  logoutUser,
};