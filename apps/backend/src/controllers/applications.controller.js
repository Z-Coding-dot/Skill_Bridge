const prisma = require("../lib/prisma");

const mapApplication = (application) => ({
  id: application.id,
  taskId: application.taskId,
  taskTitle: application.task.title,
  status: application.status,
  pitch: application.pitch,
});

const getApplications = async (req, res, next) => {
  try {
    const applications = await prisma.application.findMany({
      where: {
        applicantId: req.user.id,
      },
      include: {
        task: {
          select: {
            id: true,
            title: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json(applications.map(mapApplication));
  } catch (error) {
    next(error);
  }
};

const submitApplication = async (req, res, next) => {
  try {
    const { taskId, pitch } = req.body;

    const newApplication = await prisma.application.create({
      data: {
        taskId: taskId.trim(),
        applicantId: req.user.id,
        pitch: pitch.trim(),
      },
      include: {
        task: {
          select: {
            id: true,
            title: true,
            postedById: true,
          },
        },
      },
    });

    await prisma.notification.create({
      data: {
        userId: newApplication.task.postedById,
        type: "info",
        title: "New application received",
        message: `${req.user.name} applied to "${newApplication.task.title}".`,
        taskId: newApplication.taskId,
        applicationId: newApplication.id,
      },
    });

    res.status(201).json(mapApplication(newApplication));
  } catch (error) {
    if (error?.code === "P2002") {
      return res.status(409).json({
        message: "you have already applied to this task",
      });
    }

    if (error?.code === "P2003") {
      return res.status(400).json({
        message: "taskId must reference an existing task",
      });
    }

    next(error);
  }
};

module.exports = {
  getApplications,
  submitApplication,
};
