const express = require('express');
const router = express.Router();

const {
  applyJob,
  getApplicantsByJob,
  shortlistApplicant,
  rejectApplicant,
} = require("./ApplicantController");


const authMiddleware = require('./authMiddleware');

router.post('/apply', authMiddleware, applyJob);
router.get('/job/:jobId', authMiddleware, getApplicantsByJob);
router.post("/shortlist", authMiddleware, shortlistApplicant);
router.post("/reject", authMiddleware, rejectApplicant);
// 🔴 ADD THIS ROUTE
router.get("/", authMiddleware, async (req, res) => {
  try {
    const applications = await require("./Application")
      .find()
      .populate("student", "name branch cgpa skills")
      .populate("job", "title");

    const applicants = applications.map((app) => ({
      name: app.student?.name || "N/A",
      branch: app.student?.branch || "N/A",
      cgpa: app.student?.cgpa || "N/A",
      skills: app.student?.skills || [],
      score: app.student?.resumeScore || 0,
      status: app.status || "applied",
    }));

    res.json({ applicants });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});
module.exports = router;