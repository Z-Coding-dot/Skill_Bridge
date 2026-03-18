const express = require("express");
const { getNotifications } = require("../controllers/notifications.controller");

const router = express.Router();

router.get("/", getNotifications);

module.exports = router;
