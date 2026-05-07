const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(express.json());

// Routes
const authRoutes = require("./authRoutes");
const jobRoutes = require("./jobRoutes");
const studentroutes = require("./studentroutes");
const applicantRoutes = require("./ApplicantRoutes");
const recruiterRoutes = require("./recruiterRoutes");
const shortlistRoutes = require("./shortlistRoutes");
const dashboardRoutes = require("./dashboardRoutes");
const resumeRoutes = require("./resumeRoutes");
const settingsRoutes = require("./settingsRoutes");

// Middleware
const authMiddleware = require("./authMiddleware");

// Route Connections
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/student", studentroutes);
app.use("/api/applicants", applicantRoutes);
app.use("/api/recruiter", recruiterRoutes);
app.use("/api/shortlist", shortlistRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/settings", settingsRoutes);

// Root Route
app.get("/", (req, res) => {
  res.send("Backend running successfully");
});

// Protected Test Route
app.get("/protected", authMiddleware, (req, res) => {
  res.json({
    message: "Protected route working",
    user: req.user,
  });
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully 🚀");

    app.listen(5000, () => {
      console.log("Server running on port 5000 🚀");
    });
  })
  .catch((err) => {
    console.log("MongoDB connection error:", err);
  });
  console.log(process.env.GEMINI_API_KEY);