const express = require("express");
const router = express.Router();

const {
  signupStudent,
  loginStudent,
  signupRecruiter,
  loginRecruiter,
} = require("./authController");

router.post("/signup/student", signupStudent);
router.post("/login/student", loginStudent);

router.post("/signup/recruiter", signupRecruiter);
router.post("/login/recruiter", loginRecruiter);

module.exports = router;