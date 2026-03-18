const { getDashboardOverviewData } = require("../data/dashboard.data");

const getDashboardOverview = (req, res, next) => {
  try {
    const overview = getDashboardOverviewData();
    res.status(200).json(overview);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDashboardOverview,
};
