const express = require("express");
const router = express.Router();

const auth = require("./authMiddleware");

const {
  getStudentProfile,
  updateStudentProfile,
  getStudentDashboard,
  getMyApplications
} = require("./studentcontroller");

router.get("/profile", auth, getStudentProfile);
router.put("/profile", auth, updateStudentProfile);

router.get("/dashboard", auth, getStudentDashboard);   // ✅
router.get("/applications", auth, getMyApplications);  // ✅

module.exports = router;