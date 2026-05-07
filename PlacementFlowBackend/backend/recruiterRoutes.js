const express = require("express");
const router = express.Router();

const auth = require("./authMiddleware");

const {
  getRecruiterProfile,
  updateRecruiterProfile,
  getRecruiterDashboard,
  getMyJobs,
  deleteJob,
} = require("./recruiterController");

router.get("/profile", auth, getRecruiterProfile);
router.put("/profile", auth, updateRecruiterProfile);

router.get("/dashboard", auth, getRecruiterDashboard);

router.get("/jobs", auth, getMyJobs);

router.delete("/job/:jobId", auth, deleteJob);

module.exports = router;