const express = require('express');
const router = express.Router();

const {
  applyJob,
  getApplicantsByJob,
  shortlistApplicant,
  rejectApplicant,
} = require("./ApplicantController");


const authMiddleware = require('./authMiddleware');

router.post('/apply', authMiddleware, applyJob);
router.get('/job/:jobId', authMiddleware, getApplicantsByJob);
router.post("/shortlist", authMiddleware, shortlistApplicant);
router.post("/reject", authMiddleware, rejectApplicant);

module.exports = router;