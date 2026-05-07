const Application = require('./Application');

const applyJob = async (req, res) => {
  try {
    const studentId = req.user.id;
    const { jobId } = req.body;

    const existingApplication = await Application.findOne({
      student: studentId,
      job: jobId,
    });

    if (existingApplication) {
      return res.status(400).json({ message: 'Already applied to this job' });
    }

    const application = new Application({
      student: studentId,
      job: jobId,
    });

    await application.save();

    res.status(201).json({
      message: 'Applied successfully',
      application,
    });

  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const getApplicantsByJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    const applicants = await Application.find({ job: jobId })
      .populate('student', '-password');

    res.json(applicants);

  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// ==========================
// SHORTLIST APPLICANT
// ==========================
const shortlistApplicant = async (req, res) => {
  try {
    const { applicationId } = req.body;

    const application = await Application.findById(applicationId);

    if (!application) {
      return res.status(404).json({
        message: "Application not found",
      });
    }

    application.status = "shortlisted";

    await application.save();

    res.json({
      message: "Candidate shortlisted",
      application,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// ==========================
// REJECT APPLICANT
// ==========================
const rejectApplicant = async (req, res) => {
  try {
    const { applicationId } = req.body;

    const application = await Application.findById(applicationId);

    if (!application) {
      return res.status(404).json({
        message: "Application not found",
      });
    }

    application.status = "rejected";

    await application.save();

    res.json({
      message: "Candidate rejected",
      application,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


module.exports = {
  applyJob,
  getApplicantsByJob,
  shortlistApplicant,
  rejectApplicant,
};

