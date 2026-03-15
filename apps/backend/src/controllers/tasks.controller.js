const { getAllTasks } = require("../data/tasks.data");

const getTasks = (req, res, next) => {
  try {
    const { status, category } = req.query;

    const tasks = getAllTasks({ status, category });

    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTasks,
};
