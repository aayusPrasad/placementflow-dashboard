const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  companyName: String,
  roleTitle: String,
  package: String,
  location: String,
  eligibility: String,

  skills: [String],

  deadline: String,
  description: String,

  // ⭐ ADD THIS FIELD HERE
  recruiterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Recruiter",
  }

});

module.exports = mongoose.model("Job", jobSchema);