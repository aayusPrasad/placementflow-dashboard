const express = require("express");
const router = express.Router();
const multer = require("multer");

const auth = require("./authMiddleware");
const resumeController = require("./resumeController");
// multer setup
const storage = multer.memoryStorage();
const upload = multer({ storage });
console.log("Controller:", resumeController);
console.log("analyzeResume:", resumeController.analyzeResume);
// ✅ THIS MUST MATCH YOUR URL
router.post(
  "/upload",
  auth,
  upload.single("resume"),
  resumeController.analyzeResume
);
router.get("/test", (req, res) => {
  res.send("Resume route working");
});

module.exports = router;