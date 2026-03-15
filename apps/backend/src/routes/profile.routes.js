const express = require("express");
const {
  getProfile,
  updateProfile,
} = require("../controllers/profile.controller");

const router = express.Router();

router.get("/", getProfile);
router.put("/", updateProfile);

module.exports = router;
