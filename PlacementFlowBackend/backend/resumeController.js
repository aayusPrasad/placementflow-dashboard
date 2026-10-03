const { PDFParse } = require("pdf-parse");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const Student = require("./Student");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const analyzeResume = async (req, res) => {
  let parser = null;

  try {
    if (!req.file) {
      return res.status(400).json({
        message: "PDF file is required",
      });
    }

    if (req.file.mimetype !== "application/pdf") {
      return res.status(400).json({
        message: "Only PDF files are allowed",
      });
    }

    console.log("Resume received:", req.file.originalname);
    console.log("MIME type:", req.file.mimetype);
    console.log("File size:", req.file.size);

    parser = new PDFParse({
      data: req.file.buffer,
    });

    const pdfData = await parser.getText();
    const resumeText = pdfData.text;

    if (!resumeText || resumeText.trim().length === 0) {
      return res.status(400).json({
        message: "Could not extract text from the PDF",
      });
    }

    console.log("Resume text extracted successfully");

    const prompt = `
Analyze the following resume and respond ONLY with valid JSON.

{
  "score": number,
  "strengths": ["point1", "point2"],
  "weaknesses": ["point1", "point2"],
  "suggestions": ["point1", "point2"]
}

Rules:
- score must be between 0 and 100
- strengths must be an array of strings
- weaknesses must be an array of strings
- suggestions must be an array of strings
- Return JSON only
- Do not use markdown
- Do not use code fences

Resume:
${resumeText}
`;

    const model = genAI.getGenerativeModel({
      model: "gemini-3.8-flash",
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;

    let text = response.text();

    console.log("Gemini response:", text);

    text = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    let parsed;

    try {
      parsed = JSON.parse(text);
    } catch (error) {
      console.error("Gemini returned invalid JSON:", text);

      return res.status(500).json({
        message: "Gemini returned invalid JSON",
        rawResponse: text,
      });
    }

    await Student.findByIdAndUpdate(req.user.id, {
      resume: resumeText,
      resumeScore: parsed.score,
      resumeFeedback: [
        ...(parsed.strengths || []),
        ...(parsed.weaknesses || []),
        ...(parsed.suggestions || []),
      ],
    });

    return res.json({
      message: "Resume analyzed successfully",
      data: parsed,
    });
  } catch (error) {
    console.error("Resume analysis error:", error);

    return res.status(500).json({
      message: error.message,
    });
  } finally {
    if (parser) {
      await parser.destroy();
    }
  }
};

module.exports = {
  analyzeResume,
};
