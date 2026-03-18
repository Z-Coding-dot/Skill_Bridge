const { getAllTasks, getTaskById, createTask } = require("../data/tasks.data");
const ALLOWED_CATEGORIES = [
  "Gig",
  "Internship",
  "Tutoring",
  "Project",
  "Freelance",
];
const ALLOWED_STATUSES = ["Open", "Closed"];

const getTasks = (req, res, next) => {
  try {
    const { status, category } = req.query;

    const tasks = getAllTasks({ status, category });

    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};

const getTask = (req, res, next) => {
  try {
    const { id } = req.params;

    const task = getTaskById(id);

    if (!task) {
      return res.status(404).json({
        message: `Task with id ${id} not found`,
      });
    }

    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};

const postTask = (req, res, next) => {
  try {
    const { title, description, category, deadline, postedBy, status } =
      req.body;
    const normalizedTitle = typeof title === "string" ? title.trim() : title;
    const normalizedDescription =
      typeof description === "string" ? description.trim() : description;
    const normalizedCategory =
      typeof category === "string" ? category.trim() : category;
    const normalizedStatus =
      status === undefined
        ? "Open"
        : typeof status === "string"
          ? status.trim()
          : status;

    if (!normalizedTitle || typeof normalizedTitle !== "string") {
      return res.status(400).json({
        message: "title is required and must be a string",
      });
    }

    if (!normalizedDescription || typeof normalizedDescription !== "string") {
      return res.status(400).json({
        message: "description is required and must be a string",
      });
    }

    if (!normalizedCategory || typeof normalizedCategory !== "string") {
      return res.status(400).json({
        message: "category is required and must be a string",
      });
    }

    if (!ALLOWED_CATEGORIES.includes(normalizedCategory)) {
      return res.status(400).json({
        message: `category must be one of: ${ALLOWED_CATEGORIES.join(", ")}`,
      });
    }

    if (!deadline || typeof deadline !== "string") {
      return res.status(400).json({
        message: "deadline is required and must be a string",
      });
    }

    if (
      !postedBy ||
      typeof postedBy !== "object" ||
      typeof postedBy.id !== "string" ||
      typeof postedBy.name !== "string"
    ) {
      return res.status(400).json({
        message: "postedBy is required and must include string id and name",
      });
    }

    if (
      !normalizedStatus ||
      typeof normalizedStatus !== "string" ||
      !ALLOWED_STATUSES.includes(normalizedStatus)
    ) {
      return res.status(400).json({
        message: `status must be one of: ${ALLOWED_STATUSES.join(", ")}`,
      });
    }

    const newTask = createTask({
      title: normalizedTitle,
      description: normalizedDescription,
      category: normalizedCategory,
      deadline,
      postedBy: {
        id: postedBy.id.trim(),
        name: postedBy.name.trim(),
        ...(postedBy.avatar && typeof postedBy.avatar === "string"
          ? { avatar: postedBy.avatar.trim() }
          : {}),
      },
      status: normalizedStatus,
    });

    res.status(201).json(newTask);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTasks,
  getTask,
  postTask,
};
