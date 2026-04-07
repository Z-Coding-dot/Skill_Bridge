const prisma = require("../lib/prisma");

const mapNotification = (notification) => ({
  id: notification.id,
  type: notification.type,
  title: notification.title,
  message: notification.message,
  createdAt: notification.createdAt.toISOString(),
  readAt: notification.readAt ? notification.readAt.toISOString() : null,
});

const getNotifications = async (req, res, next) => {
  try {
    const notifications = await prisma.notification.findMany({
      where: {
        userId: req.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json(notifications.map(mapNotification));
  } catch (error) {
    next(error);
  }
};

const markNotificationAsRead = async (req, res, next) => {
  try {
    const notification = await prisma.notification.updateMany({
      where: {
        id: req.params.id,
        userId: req.user.id,
        readAt: null,
      },
      data: {
        readAt: new Date(),
      },
    });

    if (notification.count === 0) {
      return res.status(404).json({ message: "notification not found" });
    }

    return res.status(204).send();
  } catch (error) {
    next(error);
  }
};

const markAllNotificationsAsRead = async (req, res, next) => {
  try {
    await prisma.notification.updateMany({
      where: {
        userId: req.user.id,
        readAt: null,
      },
      data: {
        readAt: new Date(),
      },
    });

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
};
