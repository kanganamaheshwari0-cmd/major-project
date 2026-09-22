const express = require('express');

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);


// app.get("/", (req, res) => {
//   res.send("JobConnect Backend is running");
// });

module.exports = app;