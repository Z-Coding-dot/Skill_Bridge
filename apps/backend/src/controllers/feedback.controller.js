const prisma = require("../lib/prisma");

const submitFeedback = async (req, res, next) => {
  try {
    const { userId, subject, message, rating } = req.body;

    if (!subject || typeof subject !== "string" || subject.trim().length < 3) {
      return res.status(400).json({ message: "subject must be at least 3 characters" });
    }

    if (!message || typeof message !== "string" || message.trim().length < 10) {
      return res.status(400).json({ message: "message must be at least 10 characters" });
    }

    if (typeof rating !== "number" || rating < 1 || rating > 5) {
      return res.status(400).json({ message: "rating must be between 1 and 5" });
    }

    const feedback = await prisma.feedback.create({
      data: {
        userId: req.user.id,
        subject: subject.trim(),
        message: message.trim(),
        rating,
      },
    });

    res.status(201).json(feedback);
  } catch (error) {
    next(error);
  }
};

module.exports = { submitFeedback };