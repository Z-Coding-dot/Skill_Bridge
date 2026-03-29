const express = require("express");
const {
  getApplications,
  submitApplication,
} = require("../controllers/applications.controller");
const { requireAuth } = require("../middleware/auth.middleware");
const validateRequest = require("../middleware/validation.middleware");
const {
  createApplicationValidator,
} = require("../validators/applications.validator");

const router = express.Router();

router.get("/", requireAuth, getApplications);
router.post(
  "/",
  requireAuth,
  createApplicationValidator,
  validateRequest,
  submitApplication,
);

module.exports = router;
