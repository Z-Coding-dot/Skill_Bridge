const prisma = require("../lib/prisma");
const {
  ALLOWED_CATEGORIES,
  ALLOWED_STATUSES,
} = require("../validators/tasks.validator");

const taskInclude = {
  postedBy: {
    select: {
      id: true,
      name: true,
      avatarUrl: true,
      profile:{
        select:{
          avatar: true,
        }
      }
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
    avatar: task.postedBy.profile?.avatar
      ? `${process.env.BASE_URL || "http://localhost:3000"}${task.postedBy.profile.avatar}`
      : task.postedBy.avatarUrl ?? null,
  },
  status: task.status,
  createdAt: task.createdAt.toISOString(),
});

const normalizeTaskData = (payload) => ({
  ...(payload.title !== undefined ? { title: payload.title.trim() } : {}),
  ...(payload.description !== undefined
    ? { description: payload.description.trim() }
    : {}),
  ...(payload.category !== undefined ? { category: payload.category.trim() } : {}),
  ...(payload.deadline !== undefined ? { deadline: payload.deadline.trim() } : {}),
  ...(payload.status !== undefined ? { status: payload.status.trim() } : {}),
});

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

const getMyTasks = async (req, res, next) => {
  try {
    const tasks = await prisma.task.findMany({
      where: { postedById: req.user.id },
      include: taskInclude,
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json(tasks.map(mapTask));
  } catch (error) {
    next(error);
  }
};


const postTask = async (req, res, next) => {
  try {
    const taskData = normalizeTaskData({
      ...req.body,
      status: req.body.status === undefined ? "Open" : req.body.status,
    });

    const newTask = await prisma.task.create({
      data: {
        ...taskData,
        deadline: new Date(taskData.deadline),
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

    const taskData = normalizeTaskData(req.body);

    const updatedTask = await prisma.task.update({
      where: { id },
      data: {
        ...taskData,
        ...(taskData.deadline
          ? { deadline: new Date(taskData.deadline) }
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

module.exports = { getTasks, getTask, postTask, updateTask, deleteTask, getMyTasks };
