const express = require("express");
const cors = require("cors");
const adminRoutes = require("./routes/adminRoutes");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const jobRoutes = require("./routes/jobRoutes");
const applicationRoutes = require("./routes/applicationRoutes");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use("/api/v1/admin", adminRoutes);
// AUTH ROUTES
app.use("/api/v1/auth", authRoutes);

// USER ROUTES
app.use("/api/v1/users", userRoutes);

// JOB ROUTES
app.use("/api/v1/job", jobRoutes);

// APPLICATION ROUTES
app.use("/api/v1/application", applicationRoutes);

module.exports = app;