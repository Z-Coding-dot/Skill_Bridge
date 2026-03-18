const express = require("express");
const profileRoutes = require("./profile.routes");
const tasksRoutes = require("./tasks.routes");
const applicationsRoutes = require("./applications.routes");
const notificationsRoutes = require("./notifications.routes");

const router = express.Router();

router.get("/health", (req, res) => {
  res.status(200).json({ message: "Server is running" });
});

router.use("/profile", profileRoutes);
router.use("/tasks", tasksRoutes);
router.use("/applications", applicationsRoutes);
router.use("/notifications", notificationsRoutes);

module.exports = router;