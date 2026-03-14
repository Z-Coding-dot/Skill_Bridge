const express = require("express");
const profileRoutes = require("./profile.routes");

const router = express.Router();

router.get("/health", (req, res) => {
  res.status(200).json({ message: "Server is running" });
});

router.use("/profile", profileRoutes);

module.exports = router;
