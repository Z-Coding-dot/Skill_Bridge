const express = require("express");
const { signup, login } = require("../controllers/auth.controller");
const validateRequest = require("../middleware/validation.middleware");
const {
  signupValidator,
  loginValidator,
} = require("../validators/auth.validator");

const router = express.Router();

router.post("/signup", signupValidator, validateRequest, signup);
router.post("/login", loginValidator, validateRequest, login);

module.exports = router;
