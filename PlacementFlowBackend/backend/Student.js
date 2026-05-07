const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  branch: {
    type: String,
    default: "",
  },

  cgpa: {
    type: String,
    default: "",
  },

  semester: {
    type: String,
    default: "",
  },

  backlogs: {
    type: String,
    default: "",
  },

  university: {
    type: String,
    default: "",
  },

  rollNo: {
    type: String,
    default: "",
  },

  skills: {
    type: String,
    default: "",
  },

  certifications: {
    type: String,
    default: "",
  },

  // 🔥 Resume Data (AI Feature)
  resume: {
    type: String, // extracted text from PDF
    default: "",
  },

  resumeScore: {
    type: Number, // ✅ FIXED (was string)
    default: 0,
  },

  resumeFeedback: {
    type: [String],
    default: [],
  },

  phone: {
    type: String,
    default: "",
  },

  github: {
    type: String,
    default: "",
  },

  linkedin: {
    type: String,
    default: "",
  },

  bio: {
    type: String,
    default: "",
  },

  // ==========================
  // DASHBOARD STATS
  // ==========================
  applications: {
    type: Number,
    default: 0,
  },

  eligibleCompanies: {
    type: Number,
    default: 0,
  },

  interviews: {
    type: Number,
    default: 0,
  },

  // ==========================
  // JOB RELATIONS (OPTIONAL)
  // ==========================
  appliedJobs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
    }
  ],

  shortlistedJobs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
    }
  ],

  // ==========================
  // NOTIFICATIONS
  // ==========================
  notifications: [
    {
      type: String,
    }
  ],

  createdAt: {
    type: Date,
    default: Date.now,
  }

});

module.exports = mongoose.model("Student", studentSchema);