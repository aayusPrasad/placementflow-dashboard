const express = require('express');
const router = express.Router();

const {
  createJob,
  getAllJobs,
  getSingleJob,
  updateJob,
  deleteJob,
} = require('./jobController');

router.post('/create', createJob);
router.get('/all', getAllJobs);
router.get('/:id', getSingleJob);
router.put('/:id', updateJob);
router.delete('/:id', deleteJob);

module.exports = router;