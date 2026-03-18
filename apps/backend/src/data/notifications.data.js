let notifications = [
  {
    id: "notif-1",
    type: "info",
    title: "New application received for Web Design Project",
    message: "Please review the new application submission.",
    createdAt: "2026-03-15T10:00:00.000Z",
  },
  {
    id: "notif-2",
    type: "warning",
    title: "Application needs your attention",
    message: "One of your applications has been pending for a long time.",
    createdAt: "2026-03-14T09:30:00.000Z",
  },
  {
    id: "notif-3",
    type: "error",
    title: "Task deadline missed",
    message: "A task you applied for has already reached its deadline.",
    createdAt: "2026-03-13T16:45:00.000Z",
  },
  {
    id: "notif-4",
    type: "success",
    title: "Application accepted",
    message: "Congratulations. Your application was accepted successfully.",
    createdAt: "2026-03-12T08:15:00.000Z",
  },
];

const getAllNotifications = () => notifications;

module.exports = {
  getAllNotifications,
};
