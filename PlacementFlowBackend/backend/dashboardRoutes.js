const express = require('express');
const router = express.Router();

const { getRecruiterDashboard } = require('./dashboardController');
const authMiddleware = require('./authMiddleware');

router.get('/', authMiddleware, getRecruiterDashboard);

module.exports = router;