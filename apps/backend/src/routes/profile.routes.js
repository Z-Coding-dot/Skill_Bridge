const express = require("express");
const { getProfile, updateProfile, upload, getProfileById } = require("../controllers/profile.controller");
const { requireAuth } = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/", requireAuth, getProfile);
router.get("/:id", requireAuth, getProfileById);
router.put("/", requireAuth, upload.single("avatar"), updateProfile);

module.exports = router;