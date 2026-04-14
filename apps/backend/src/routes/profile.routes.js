const express = require("express");
const { getProfile, updateProfile, getProfileById } = require("../controllers/profile.controller");
const { requireAuth } = require("../middleware/auth.middleware");
const upload = require("../config/multer");

const router = express.Router();

router.get("/", requireAuth, getProfile);
router.get("/:id", requireAuth, getProfileById);
router.put("/", requireAuth, upload.single("avatar"), updateProfile); 

module.exports = router;