const express = require("express");
const { requireAuth } = require("../middleware/auth.middleware");
const { submitFeedback } = require("../controllers/feedback.controller");

const router = express.Router();

router.post("/", requireAuth, submitFeedback);

module.exports = router;