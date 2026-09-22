const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    phone: {
      type: String,
    },

    role: {
      type: String,
      enum: ["student", "recruiter", "admin"],
      default: "student",
    },

    profilePicture: {
      type: String,
      default: "",
    },

    about: {
      type: String,
      default: "",
    },

    skills: {
      type: [String],
      default: [],
    },
    education: [
  {
    degree: String,
    institution: String,
    year: String,
  },
],

experience: [
  {
    company: String,
    position: String,
    duration: String,
  },
],

projects: [
  {
    title: String,
    description: String,
    technologies: [String],
  },
],

github: {
  type: String,
  default: "",
},

linkedin: {
  type: String,
  default: "",
},

portfolio: {
  type: String,
  default: "",
},

revokedTokens: {
  type: [String],
  default: [],
},

    isBlocked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;