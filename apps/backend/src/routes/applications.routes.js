const express = require("express");
const {
  getApplications,
  submitApplication,
} = require("../controllers/applications.controller");

const router = express.Router();

router.get("/", getApplications);
router.post("/", submitApplication);

module.exports = router;
