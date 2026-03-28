const { getDashboardOverviewData } = require("../data/dashboard.data");

const getDashboardOverview = async (req, res, next) => {
  try {
    const overview = await getDashboardOverviewData();
    res.status(200).json(overview);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDashboardOverview,
};
