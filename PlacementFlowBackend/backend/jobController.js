const Job = require("./Job");

exports.createJob = async (req, res) => {
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

    // convert skills string → array
    const skillsArray = skills
      ? skills.split(",").map((s) => s.trim())
      : [];

    const newJob = new Job({
      companyName,
      roleTitle,
      package,
      location,
      eligibility,
      skills: skillsArray,
      deadline,
      description,
      recruiterId: req.user.id
    });

    await newJob.save();

    res.status(201).json({
      message: "Job created successfully",
      job: newJob,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
