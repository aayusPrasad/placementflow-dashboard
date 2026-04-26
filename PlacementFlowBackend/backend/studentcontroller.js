const Student = require("./Student");
const Job = require("./Job");
const Application = require("./Application");


// ==========================
// GET STUDENT PROFILE
// ==========================
exports.getStudentProfile = async (req, res) => {
  try {
    const student = await Student.findById(req.user.id);

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    res.status(200).json({
      student,
    });

  } catch (error) {
    res.status(500).json({
      message: "Error fetching profile",
      error: error.message,
    });
  }
};


// ==========================
// UPDATE STUDENT PROFILE
// ==========================
exports.updateStudentProfile = async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.user.id,
      {
        name: req.body.name,
        branch: req.body.branch,
        cgpa: req.body.cgpa,
        semester: req.body.semester,
        backlogs: req.body.backlogs,
        university: req.body.university,
        rollNo: req.body.rollNo,
        skills: req.body.skills,
        certifications: req.body.certifications,
        resume: req.body.resume,
      },
      { new: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    res.status(200).json({
      message: "Profile updated successfully",
      student: updatedStudent,
    });

  } catch (error) {
    res.status(500).json({
      message: "Error updating profile",
      error: error.message,
    });
  }
};


// ==========================
// STUDENT DASHBOARD
// ==========================
exports.getStudentDashboard = async (req, res) => {
  try {
    const studentId = req.user.id;

    // Get all applications
    const applications = await Application.find({ student: studentId })
      .populate("job");

    const totalApplications = applications.length;

    const applied = applications.filter(
      app => app.status === "applied"
    ).length;

    const shortlisted = applications.filter(
      app => app.status === "shortlisted"
    ).length;

    const rejected = applications.filter(
      app => app.status === "rejected"
    ).length;

    // Optional clean UI format
    const formattedApplications = applications.map(app => ({
      jobId: app.job?._id,
      company: app.job?.companyName,
      role: app.job?.roleTitle,
      location: app.job?.location,
      status: app.status,
    }));

    res.status(200).json({
      totalApplications,
      applied,
      shortlisted,
      rejected,
      applications, // full raw data
      formattedApplications, // clean UI data
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// ==========================
// GET MY APPLICATIONS
// ==========================
exports.getMyApplications = async (req, res) => {
  try {
    const studentId = req.user.id;

    const applications = await Application.find({ student: studentId })
      .populate("job");

    res.status(200).json(applications);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};