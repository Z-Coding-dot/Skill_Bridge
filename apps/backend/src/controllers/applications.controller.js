const {
  getAllApplications,
  createApplication,
} = require("../data/applications.data");

const getApplications = (req, res, next) => {
  try {
    const applications = getAllApplications();
    res.status(200).json(applications);
  } catch (error) {
    next(error);
  }
};

const submitApplication = (req, res, next) => {
  try {
    const { taskTitle, pitch } = req.body;
    const normalizedTaskTitle =
      typeof taskTitle === "string" ? taskTitle.trim() : taskTitle;
    const normalizedPitch = typeof pitch === "string" ? pitch.trim() : pitch;

    if (!normalizedTaskTitle || typeof normalizedTaskTitle !== "string") {
      return res.status(400).json({
        message: "taskTitle is required and must be a string",
      });
    }

    if (!normalizedPitch || typeof normalizedPitch !== "string") {
      return res.status(400).json({
        message: "pitch is required and must be a string",
      });
    }

    const newApplication = createApplication({
      taskTitle: normalizedTaskTitle,
      pitch: normalizedPitch,
    });

    res.status(201).json(newApplication);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getApplications,
  submitApplication,
};
