const mongoose = require("mongoose");

const applicantSchema = new mongoose.Schema({
  name: String,
  branch: String,
  cgpa: Number,
  skills: [String],
  score: Number,
  status: String,
});

module.exports = mongoose.model("Applicant", applicantSchema);