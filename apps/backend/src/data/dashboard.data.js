const { getTasksCount } = require("./tasks.data");
const {
  getApplicationsCount,
  getAcceptedApplicationsCount,
} = require("./applications.data");

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

const getDashboardOverviewData = () => {
  return {
    stats: {
      tasksPosted: getTasksCount(),
      applicationsSent: getApplicationsCount(),
      accepted: getAcceptedApplicationsCount(),
    },
    recentActivity,
  };
};

module.exports = {
  getDashboardOverviewData,
};
