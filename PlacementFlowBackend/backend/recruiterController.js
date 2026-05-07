const Recruiter = require("./Recruiter");
const Job = require("./Job");
const Application = require("./Application");

// ==========================
// GET RECRUITER PROFILE
// ==========================
const getRecruiterProfile = async (req, res) => {
  try {
    const recruiter = await Recruiter.findById(req.user.id).select("-password");

    if (!recruiter) {
      return res.status(404).json({
        message: "Recruiter not found",
      });
    }

    res.json(recruiter);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// ==========================
// UPDATE RECRUITER PROFILE
// ==========================
const updateRecruiterProfile = async (req, res) => {
  try {
    const { name, company, designation, phone } = req.body;

    const recruiter = await Recruiter.findById(req.user.id);

    if (!recruiter) {
      return res.status(404).json({
        message: "Recruiter not found",
      });
    }

    // Update fields safely
    recruiter.name = name || recruiter.name;
    recruiter.company = company || recruiter.company;
    recruiter.designation = designation || recruiter.designation;
    recruiter.phone = phone || recruiter.phone;

    await recruiter.save();

    res.json({
      message: "Profile updated successfully",
      recruiter,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// ==========================
// GET RECRUITER DASHBOARD
// ==========================
const getRecruiterDashboard = async (req, res) => {
  try {
    const recruiterId = req.user.id;

    // Get all jobs of recruiter
    const jobs = await Job.find({ recruiterId });

    const jobIds = jobs.map(job => job._id);

    // Get all applications for those jobs
    const applications = await Application.find({
      job: { $in: jobIds },
    });

    const totalJobs = jobs.length;
    const totalApplicants = applications.length;

    const shortlisted = applications.filter(
      app => app.status === "shortlisted"
    ).length;

    const rejected = applications.filter(
      app => app.status === "rejected"
    ).length;

    const applied = applications.filter(
      app => app.status === "applied"
    ).length;

    res.json({
      totalJobs,
      totalApplicants,
      applied,
      shortlisted,
      rejected,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// ==========================
// GET JOBS POSTED BY RECRUITER
// ==========================
const getMyJobs = async (req, res) => {
  try {
    const recruiterId = req.user.id;

    const jobs = await Job.find({ recruiterId });

    res.json(jobs);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// ==========================
// DELETE JOB
// ==========================
const deleteJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    // Ensure recruiter owns this job
    if (job.recruiterId.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Unauthorized",
      });
    }

    await job.deleteOne();

    res.json({
      message: "Job deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


module.exports = {
  getRecruiterProfile,
  updateRecruiterProfile,
  getRecruiterDashboard,
  getMyJobs,
  deleteJob,
};