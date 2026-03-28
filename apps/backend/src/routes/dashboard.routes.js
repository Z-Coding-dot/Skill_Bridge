const express = require("express");
const { getDashboardOverview } = require("../controllers/dashboard.controller");
const { requireAuth } = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/overview", requireAuth, getDashboardOverview);

module.exports = router;
