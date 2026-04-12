const express = require("express");
const authRoutes = require("./auth.routes");
const profileRoutes = require("./profile.routes");
const tasksRoutes = require("./tasks.routes");
const applicationsRoutes = require("./applications.routes");
const notificationsRoutes = require("./notifications.routes");
const messagesRoutes = require("./messages.routes");
const dashboardRoutes = require("./dashboard.routes");
const adminRoutes = require("./admin.routes");
const feedbackRoutes = require("./feedback.routes");


const router = express.Router();

router.get("/health", (req, res) => {
  res.status(200).json({ message: "Server is running" });
});

router.use("/auth", authRoutes);
router.use("/profile", profileRoutes);
router.use("/tasks", tasksRoutes);
router.use("/applications", applicationsRoutes);
router.use("/notifications", notificationsRoutes);
router.use("/messages", messagesRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/admin", adminRoutes);
router.use("/feedback", feedbackRoutes);


module.exports = router;
