// shortlistController.js

const Application = require('./Application');
const Student = require('./Student'); // 🔴 ADD

const shortlistApplicant = async (req, res) => {
  try {
    const { applicationId } = req.params;

    const application = await Application.findById(applicationId).populate("student");

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    application.status = 'shortlisted';
    await application.save();

    // 🔴 ADD NOTIFICATION
    await Student.findByIdAndUpdate(application.student._id, {
      $push: {
        notifications: {
          title: "Shortlisted 🎉",
          desc: `You have been shortlisted for ${application.job || "a job"}`,
          time: new Date().toLocaleString(),
          read: false,
          icon: "CheckCircle",
          color: "text-green-500"
        }
      }
    });

    res.json({
      message: 'Applicant shortlisted successfully',
      application,
    });

  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const rejectApplicant = async (req, res) => {
  try {
    const { applicationId } = req.params;

    const application = await Application.findById(applicationId).populate("student");

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    application.status = 'rejected';
    await application.save();

    // 🔴 ADD NOTIFICATION
    await Student.findByIdAndUpdate(application.student._id, {
      $push: {
        notifications: {
          title: "Application Update",
          desc: `Your application was not selected`,
          time: new Date().toLocaleString(),
          read: false,
          icon: "AlertCircle",
          color: "text-red-500"
        }
      }
    });

    res.json({
      message: 'Applicant rejected successfully',
      application,
    });

  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  shortlistApplicant,
  rejectApplicant,
};