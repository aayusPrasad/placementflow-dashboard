const Application = require('./Application');

const shortlistApplicant = async (req, res) => {
  try {
    const { applicationId } = req.params;

    const application = await Application.findById(applicationId);

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    application.status = 'shortlisted';

    await application.save();

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

    const application = await Application.findById(applicationId);

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    application.status = 'rejected';

    await application.save();

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