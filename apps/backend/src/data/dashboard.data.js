const prisma = require("../lib/prisma");

const formatRelativeTime = (date) => {
  const diffMs = Date.now() - date.getTime();
  const diffMinutes = Math.max(1, Math.floor(diffMs / (1000 * 60)));

  if (diffMinutes < 60) {
    return `${diffMinutes} minute${diffMinutes === 1 ? "" : "s"} ago`;
  }

  const diffHours = Math.floor(diffMinutes / 60);

  if (diffHours < 24) {
    return `${diffHours} hour${diffHours === 1 ? "" : "s"} ago`;
  }

  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays} day${diffDays === 1 ? "" : "s"} ago`;
};

const applicationTypeMap = {
  pending: "info",
  accepted: "success",
  rejected: "error",
};

const getDashboardOverviewData = async (userId) => {
  const [tasksPosted, applicationsSent, accepted, tasks, applications] =
    await Promise.all([
      prisma.task.count({
        where: {
          postedById: userId,
        },
      }),
      prisma.application.count({
        where: {
          applicantId: userId,
        },
      }),
      prisma.application.count({
        where: {
          applicantId: userId,
          status: "accepted",
        },
      }),
      prisma.task.findMany({
        where: {
          postedById: userId,
        },
        select: {
          id: true,
          title: true,
          createdAt: true,
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 5,
      }),
      prisma.application.findMany({
        where: {
          applicantId: userId,
        },
        select: {
          id: true,
          status: true,
          createdAt: true,
          task: {
            select: {
              title: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 5,
      }),
    ]);

  const recentActivity = [
    ...tasks.map((task) => ({
      id: `task-${task.id}`,
      type: "info",
      text: `You posted task "${task.title}"`,
      time: formatRelativeTime(task.createdAt),
      createdAt: task.createdAt,
    })),
    ...applications.map((application) => ({
      id: `application-${application.id}`,
      type: applicationTypeMap[application.status],
      text: `Your application for "${application.task.title}" is ${application.status}`,
      time: formatRelativeTime(application.createdAt),
      createdAt: application.createdAt,
    })),
  ]
    .sort((left, right) => right.createdAt.getTime() - left.createdAt.getTime())
    .slice(0, 5)
    .map(({ createdAt, ...activity }) => activity);

  return {
    stats: {
      tasksPosted,
      applicationsSent,
      accepted,
    },
    recentActivity,
  };
};

module.exports = {
  getDashboardOverviewData,
};
