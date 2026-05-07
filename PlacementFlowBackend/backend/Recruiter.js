const mongoose = require("mongoose");

const recruiterSchema = new mongoose.Schema({
  companyName: String,
  recruiterName: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  designation: String,
  website: String,
});

module.exports = mongoose.model("Recruiter", recruiterSchema);