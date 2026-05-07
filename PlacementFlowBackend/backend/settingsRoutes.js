// settingsRoutes.js
const express = require("express");
const router = express.Router();
const auth = require("./authMiddleware");
const Student = require("./Student");

// GET SETTINGS
router.get("/", auth, async (req, res) => {
  try {
    const student = await Student.findById(req.user.id).select(
        "-password name email phone github linkedin"
    );

    res.json(student);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// UPDATE SETTINGS
router.put("/", auth, async (req, res) => {
  try {
    const updated = await Student.findByIdAndUpdate(
      req.user.id,
      {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        github: req.body.github,
        linkedin: req.body.linkedin,
      },
      { new: true }
    ).select("-password");

    res.json({
      message: "Settings updated",
      student: updated,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;