const express = require("express");
const profileRoutes = require("./profile.routes");
const tasksRoutes = require("./tasks.routes");

const router = express.Router();

router.get("/health", (req, res) => {
  res.status(200).json({ message: "Server is running" });
});

router.use("/profile", profileRoutes);
router.use("/tasks", tasksRoutes);

module.exports = router;
