const express = require("express");
const router = express.Router();

const { createJob, getAllJobs } = require("./jobController");
const auth = require("./authMiddleware");

// ⭐ IMPORTANT
router.post("/", auth, createJob);   // THIS FIXES YOUR ERROR
router.get("/", getAllJobs);

module.exports = router;