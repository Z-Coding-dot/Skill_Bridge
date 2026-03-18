const express = require("express");
const { getMessages } = require("../controllers/messages.controller");

const router = express.Router();

router.get("/", getMessages);

module.exports = router;
