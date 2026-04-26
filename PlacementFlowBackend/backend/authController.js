const Student = require("./Student");
const Recruiter = require("./Recruiter");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "secretkey";


// ==========================
// STUDENT SIGNUP
// ==========================
exports.signupStudent = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingStudent = await Student.findOne({ email });

    if (existingStudent) {
      return res.status(400).json({
        message: "Student already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const student = new Student({
      name,
      email,
      password: hashedPassword,
    });

    await student.save();

    res.status(201).json({
      message: "Student signup successful",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// ==========================
// RECRUITER SIGNUP
// ==========================
exports.signupRecruiter = async (req, res) => {
  try {
    const { companyName, email, password, designation } = req.body;

    const existingRecruiter = await Recruiter.findOne({ email });

    if (existingRecruiter) {
      return res.status(400).json({
        message: "Recruiter already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const recruiter = new Recruiter({
      companyName,
      email,
      password: hashedPassword,
      designation,
    });

    await recruiter.save();

    res.status(201).json({
      message: "Recruiter signup successful",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// ==========================
// STUDENT LOGIN
// ==========================
exports.loginStudent = async (req, res) => {
  try {
    const { email, password } = req.body;

    const student = await Student.findOne({ email });

    if (!student) {
      return res.status(400).json({
        message: "Student not found",
      });
    }

    const isMatch = await bcrypt.compare(password, student.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      {
        id: student._id,
        role: "student",
      },
      JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.json({
      token,
      student: {
        id: student._id,
        name: student.name,
        email: student.email,
      },
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// ==========================
// RECRUITER LOGIN
// ==========================
exports.loginRecruiter = async (req, res) => {
  try {
    const { email, password } = req.body;

    const recruiter = await Recruiter.findOne({ email });

    if (!recruiter) {
      return res.status(400).json({
        message: "Recruiter not found",
      });
    }

    const isMatch = await bcrypt.compare(password, recruiter.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      {
        id: recruiter._id,
        role: "recruiter",
      },
      JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.json({
      token,
      recruiter: {
        id: recruiter._id,
        companyName: recruiter.companyName,
        email: recruiter.email,
      },
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};