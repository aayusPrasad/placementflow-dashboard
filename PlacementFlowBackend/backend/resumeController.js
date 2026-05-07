const pdf = require("pdf-parse");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const Student = require("./Student");

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// ==========================
// ANALYZE RESUME (PDF)
// ==========================
const analyzeResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "PDF file is required",
      });
    }

    // 📄 Extract text
    const pdfData = await pdf(req.file.buffer);
    const resumeText = pdfData.text;
    const prompt = `
Analyze the resume and respond ONLY in JSON:

{
  "score": number (0-100),
  "strengths": ["point1"],
  "weaknesses": ["point1"],
  "suggestions": ["point1"]
}

Resume:
${resumeText}
`;

    // 🔥 Use NEW WORKING MODEL
    const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

const result = await model.generateContent(prompt);
const response = await result.response;

let text = response.text();
text = text.replace(/```json|```/g, "").trim();

const parsed = JSON.parse(text);
    // 💾 Save to DB
    await Student.findByIdAndUpdate(req.user.id, {
      resume: resumeText,
      resumeScore: parsed.score,
      resumeFeedback: [
        ...parsed.strengths,
        ...parsed.weaknesses,
        ...parsed.suggestions,
      ],
    });

    res.json({
      message: "Resume analyzed successfully",
      data: parsed,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  analyzeResume,
};