const { body } = require("express-validator");

const createApplicationValidator = [
  body("taskId")
    .trim()
    .notEmpty()
    .withMessage("taskId is required"),
  body("pitch")
    .trim()
    .notEmpty()
    .withMessage("pitch is required"),
];

module.exports = {
  createApplicationValidator,
};
