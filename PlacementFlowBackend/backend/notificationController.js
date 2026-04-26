const Job = require('./Job');

const createJob = async (req, res) => {
  try {
    const {
      companyName,
      roleTitle,
      package,
      location,
      eligibility,
      skills,
      deadline,
      description,
    } = req.body;

    const job = new Job({
      companyName,
      roleTitle,
      package,
      location,
      eligibility,
      skills,
      deadline,
      description,
    });

    await job.save();

    res.status(201).json({
      message: 'Job created successfully',
      job,
    });

  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find();

    res.json(jobs);

  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const getSingleJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    res.json(job);

  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    Object.assign(job, req.body);

    await job.save();

    res.json({
      message: 'Job updated successfully',
      job,
    });

  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    await job.deleteOne();

    res.json({
      message: 'Job deleted successfully',
    });

  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  createJob,
  getAllJobs,
  getSingleJob,
  updateJob,
  deleteJob,
};