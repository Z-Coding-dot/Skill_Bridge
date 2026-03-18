const { getAllNotifications } = require("../data/notifications.data");

const getNotifications = (req, res, next) => {
  try {
    const notifications = getAllNotifications();
    res.status(200).json(notifications);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getNotifications,
};
