// dashboardController.js

const Job = require("./Job");
const Application = require("./Application");
const Student = require("./Student");

// ✅ Recruiter Dashboard
const getRecruiterDashboard = async (req, res) => {
  try {
    const totalJobs = await Job.countDocuments();
    const totalApplicants = await Application.countDocuments();

    const shortlisted = await Application.countDocuments({ status: "shortlisted" });
    const rejected = await Application.countDocuments({ status: "rejected" });
    const applied = await Application.countDocuments({ status: "applied" });

    res.json({
      totalJobs,
      totalApplicants,
      shortlisted,
      rejected,
      applied,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// ✅ Student Dashboard 
const getStudentDashboard = async (req, res) => {
  try {
    const student = await Student.findById(req.user.id)
      .populate("appliedJobs")
      .select("-password");

    res.json({ student });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getRecruiterDashboard,
  getStudentDashboard,
};