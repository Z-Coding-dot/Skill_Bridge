const express = require("express");
const { getProfile, updateProfile, upload, getProfileById } = require("../controllers/profile.controller");const { requireAuth } = require("../middleware/auth.middleware");
const {
  getProfile,
  updateProfile,
} = require("../controllers/profile.controller");
const { requireAuth } = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/", requireAuth, getProfile);
router.put("/", requireAuth, upload.single("avatar"), updateProfile);
router.get("/:id",  requireAuth, getProfileById); 
router.put("/", requireAuth, updateProfile);


module.exports = router;