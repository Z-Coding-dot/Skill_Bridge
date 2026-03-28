const prisma = require("../lib/prisma");

const recentActivity = [
  {
    id: "1",
    type: "success",
    text: "New application received",
    time: "2 hours ago",
  },
  {
    id: "2",
    type: "warning",
    text: "Your application needs attention",
    time: "1 day ago",
  },
];

const getDashboardOverviewData = async () => {
  const [tasksPosted, applicationsSent, accepted] = await Promise.all([
    prisma.task.count(),
    prisma.application.count(),
    prisma.application.count({
      where: {
        status: "accepted",
      },
    }),
  ]);

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
