const prisma = require("../lib/prisma");

const ALLOWED_CATEGORIES = [
  "Gig",
  "Internship",
  "Tutoring",
  "Project",
  "Freelance",
];

const ALLOWED_STATUSES = ["Open", "Closed"];

const taskInclude = {
  postedBy: {
    select: {
      id: true,
      name: true,
      avatarUrl: true,
    },
  },
};

const mapTask = (task) => ({
  id: task.id,
  title: task.title,
  description: task.description,
  category: task.category,
  deadline: task.deadline.toISOString(),
  postedBy: {
    id: task.postedBy.id,
    name: task.postedBy.name,
    ...(task.postedBy.avatarUrl ? { avatar: task.postedBy.avatarUrl } : {}),
  },
  status: task.status,
  createdAt: task.createdAt.toISOString(),
});

const validateTaskPayload = ({
  title,
  description,
  category,
  deadline,
  status,
  partial = false,
}) => {
  const normalizedTitle = typeof title === "string" ? title.trim() : title;
  const normalizedDescription =
    typeof description === "string" ? description.trim() : description;
  const normalizedCategory =
    typeof category === "string" ? category.trim() : category;
  const normalizedDeadline =
    typeof deadline === "string" ? deadline.trim() : deadline;
  const normalizedStatus =
    status === undefined
      ? undefined
      : typeof status === "string"
        ? status.trim()
        : status;

  if (
    (!partial || title !== undefined) &&
    (!normalizedTitle || typeof normalizedTitle !== "string")
  ) {
    return { error: "title is required and must be a string" };
  }

  if (
    (!partial || description !== undefined) &&
    (!normalizedDescription || typeof normalizedDescription !== "string")
  ) {
    return { error: "description is required and must be a string" };
  }

  if (
    (!partial || category !== undefined) &&
    (!normalizedCategory || typeof normalizedCategory !== "string")
  ) {
    return { error: "category is required and must be a string" };
  }

  if (
    normalizedCategory !== undefined &&
    !ALLOWED_CATEGORIES.includes(normalizedCategory)
  ) {
    return {
      error: `category must be one of: ${ALLOWED_CATEGORIES.join(", ")}`,
    };
  }

  if (
    (!partial || deadline !== undefined) &&
    (!normalizedDeadline || typeof normalizedDeadline !== "string")
  ) {
    return { error: "deadline is required and must be a string" };
  }

  if (normalizedDeadline !== undefined) {
    const parsedDeadline = new Date(normalizedDeadline);

    if (Number.isNaN(parsedDeadline.getTime())) {
      return { error: "deadline must be a valid date string" };
    }
  }

  if (
    normalizedStatus !== undefined &&
    (!normalizedStatus ||
      typeof normalizedStatus !== "string" ||
      !ALLOWED_STATUSES.includes(normalizedStatus))
  ) {
    return {
      error: `status must be one of: ${ALLOWED_STATUSES.join(", ")}`,
    };
  }

  return {
    data: {
      ...(normalizedTitle !== undefined ? { title: normalizedTitle } : {}),
      ...(normalizedDescription !== undefined
        ? { description: normalizedDescription }
        : {}),
      ...(normalizedCategory !== undefined ? { category: normalizedCategory } : {}),
      ...(normalizedDeadline !== undefined ? { deadline: normalizedDeadline } : {}),
      ...(normalizedStatus !== undefined ? { status: normalizedStatus } : {}),
    },
  };
};

const getTasks = async (req, res, next) => {
  try {
    const { status, category } = req.query;
    const tasks = await prisma.task.findMany({
      where: {
        ...(typeof status === "string" && ALLOWED_STATUSES.includes(status)
          ? { status }
          : {}),
        ...(typeof category === "string" && ALLOWED_CATEGORIES.includes(category)
          ? { category }
          : {}),
      },
      include: taskInclude,
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json(tasks.map(mapTask));
  } catch (error) {
    next(error);
  }
};

const getTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await prisma.task.findUnique({
      where: { id },
      include: taskInclude,
    });

    if (!task) {
      return res.status(404).json({
        message: `Task with id ${id} not found`,
      });
    }

    res.status(200).json(mapTask(task));
  } catch (error) {
    next(error);
  }
};

const postTask = async (req, res, next) => {
  try {
    const validation = validateTaskPayload({
      ...req.body,
      status: req.body.status === undefined ? "Open" : req.body.status,
    });

    if (validation.error) {
      return res.status(400).json({
        message: validation.error,
      });
    }

    const newTask = await prisma.task.create({
      data: {
        ...validation.data,
        deadline: new Date(validation.data.deadline),
        postedById: req.user.id,
      },
      include: taskInclude,
    });

    res.status(201).json(mapTask(newTask));
  } catch (error) {
    next(error);
  }
};

const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const existingTask = await prisma.task.findUnique({
      where: { id },
      include: taskInclude,
    });

    if (!existingTask) {
      return res.status(404).json({
        message: `Task with id ${id} not found`,
      });
    }

    if (existingTask.postedBy.id !== req.user.id) {
      return res.status(403).json({
        message: "you can only update your own tasks",
      });
    }

    const validation = validateTaskPayload({
      ...req.body,
      partial: true,
    });

    if (validation.error) {
      return res.status(400).json({
        message: validation.error,
      });
    }

    const updatedTask = await prisma.task.update({
      where: { id },
      data: {
        ...validation.data,
        ...(validation.data.deadline
          ? { deadline: new Date(validation.data.deadline) }
          : {}),
      },
      include: taskInclude,
    });

    res.status(200).json(mapTask(updatedTask));
  } catch (error) {
    next(error);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const existingTask = await prisma.task.findUnique({
      where: { id },
      include: taskInclude,
    });

    if (!existingTask) {
      return res.status(404).json({
        message: `Task with id ${id} not found`,
      });
    }

    if (existingTask.postedBy.id !== req.user.id) {
      return res.status(403).json({
        message: "you can only delete your own tasks",
      });
    }

    const deletedTask = await prisma.task.delete({
      where: { id },
      include: taskInclude,
    });

    res.status(200).json({
      message: "Task deleted successfully",
      task: mapTask(deletedTask),
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTasks,
  getTask,
  postTask,
  updateTask,
  deleteTask,
};
