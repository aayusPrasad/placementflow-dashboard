// dashboardRoutes.js

const express = require("express");
const router = express.Router();

const {
  getRecruiterDashboard,
  getStudentDashboard,
} = require("./dashboardController");

const authMiddleware = require("./authMiddleware");

// ✅ Recruiter Dashboard
router.get("/", authMiddleware, getRecruiterDashboard);

// ✅ Student Dashboard 
router.get("/student", authMiddleware, getStudentDashboard);

module.exports = router;