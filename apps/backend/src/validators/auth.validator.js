const { body } = require("express-validator");

const signupValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("name is required"),
  body("email")
    .trim()
    .isEmail()
    .withMessage("a valid email is required")
    .normalizeEmail(),
  body("bio")
    .optional({ values: "falsy" })
    .isString()
    .withMessage("bio must be a string"),
  body("skills")
    .optional()
    .isArray()
    .withMessage("skills must be an array"),
  body("skills.*.value")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("skill value is required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("password must be at least 6 characters"),
];

const loginValidator = [
  body("email")
    .trim()
    .isEmail()
    .withMessage("a valid email is required")
    .normalizeEmail(),
  body("password")
    .notEmpty()
    .withMessage("password is required"),
];

module.exports = {
  signupValidator,
  loginValidator,
};
