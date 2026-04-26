const Job = require('./Job');
const Application = require('./Application');

const getRecruiterDashboard = async (req, res) => {
  try {
    const totalJobs = await Job.countDocuments();

    const totalApplicants = await Application.countDocuments();

    const shortlisted = await Application.countDocuments({
      status: 'shortlisted',
    });

    const rejected = await Application.countDocuments({
      status: 'rejected',
    });

    const applied = await Application.countDocuments({
      status: 'applied',
    });

    res.json({
      totalJobs,
      totalApplicants,
      shortlisted,
      rejected,
      applied,
    });

  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  getRecruiterDashboard,
};