const express = require("express");
const router = express.Router();

const {
  signupStudent,
  signupRecruiter,
  loginStudent,
  loginRecruiter,
} = require("./authController");

router.post("/signup/student", signupStudent);
router.post("/signup/recruiter", signupRecruiter);

router.post("/login/student", loginStudent);
router.post("/login/recruiter", loginRecruiter);

module.exports = router;