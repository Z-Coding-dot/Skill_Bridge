const express = require("express");
const {
  signup,
  login,
  me,
  logout,
} = require("../controllers/auth.controller");
const { requireAuth } = require("../middleware/auth.middleware");
const validateRequest = require("../middleware/validation.middleware");
const {
  signupValidator,
  loginValidator,
} = require("../validators/auth.validator");

const router = express.Router();

router.post("/signup", signupValidator, validateRequest, signup);
router.post("/login", loginValidator, validateRequest, login);
router.get("/me", requireAuth, me);
router.post("/logout", logout);

module.exports = router;
