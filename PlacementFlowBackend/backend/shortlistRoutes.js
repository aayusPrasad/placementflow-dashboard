const express = require('express');
const router = express.Router();

const {
  shortlistApplicant,
  rejectApplicant,
} = require('./shortlistController');

const authMiddleware = require('./authMiddleware');

router.put('/shortlist/:applicationId', authMiddleware, shortlistApplicant);
router.put('/reject/:applicationId', authMiddleware, rejectApplicant);

module.exports = router;