const prisma = require("../lib/prisma");

// Stats
const getStats = async (req, res, next) => {
  try {
    const [totalUsers, totalTasks, totalApplications, totalFeedbacks] = await Promise.all([
      prisma.user.count(),
      prisma.task.count(),
      prisma.application.count(),
      prisma.feedback.count(),
    ]);

    res.status(200).json({ totalUsers, totalTasks, totalApplications, totalFeedbacks });
  } catch (error) {
    next(error);
  }
};

// Users
const getUsers = async (req, res, next) => {
  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        _count: {
          select: {
            postedTasks: true,
            applications: true,
          },
        },
      },
    });

    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    await prisma.user.delete({ where: { id } });
    res.status(200).json({ message: "user deleted" });
  } catch (error) {
    next(error);
  }
};

// Tasks
const getTasks = async (req, res, next) => {
  try {
    const tasks = await prisma.task.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        description: true,
        category: true,
        status: true,
        deadline: true,
        createdAt: true,
        postedBy: {
          select: { id: true, name: true },
        },
        _count: {
          select: { applications: true },
        },
      },
    });

    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    await prisma.task.delete({ where: { id } });
    res.status(200).json({ message: "task deleted" });
  } catch (error) {
    next(error);
  }
};

// Feedbacks
const getFeedbacks = async (req, res, next) => {
  try {
    const feedbacks = await prisma.feedback.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        subject: true,
        message: true,
        rating: true,
        createdAt: true,
        user: {
          select: { id: true, name: true, email: true },
        },
      },
    });

    res.status(200).json(feedbacks);
  } catch (error) {
    next(error);
  }
};

const deleteFeedback = async (req, res, next) => {
  try {
    const { id } = req.params;
    await prisma.feedback.delete({ where: { id } });
    res.status(200).json({ message: "feedback deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = { getStats, getUsers, deleteUser, getTasks, deleteTask, getFeedbacks, deleteFeedback };