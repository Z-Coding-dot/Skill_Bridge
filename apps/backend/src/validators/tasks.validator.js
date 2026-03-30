const { body } = require("express-validator");

const ALLOWED_CATEGORIES = [
  "Gig",
  "Internship",
  "Tutoring",
  "Project",
  "Freelance",
];

const ALLOWED_STATUSES = ["Open", "Closed"];

const taskFieldValidators = (optional = false) => {
  const maybeOptional = (validator) =>
    optional ? validator.optional() : validator;

  return [
    maybeOptional(
      body("title")
        .trim()
        .notEmpty()
        .withMessage("title is required and must be a string"),
    ),
    maybeOptional(
      body("description")
        .trim()
        .notEmpty()
        .withMessage("description is required and must be a string"),
    ),
    maybeOptional(
      body("category")
        .trim()
        .isIn(ALLOWED_CATEGORIES)
        .withMessage(`category must be one of: ${ALLOWED_CATEGORIES.join(", ")}`),
    ),
    maybeOptional(
      body("deadline")
        .trim()
        .notEmpty()
        .withMessage("deadline is required and must be a string")
        .bail()
        .isISO8601()
        .withMessage("deadline must be a valid date string"),
    ),
    maybeOptional(
      body("status")
        .trim()
        .isIn(ALLOWED_STATUSES)
        .withMessage(`status must be one of: ${ALLOWED_STATUSES.join(", ")}`),
    ),
  ];
};

const createTaskValidator = taskFieldValidators(false);
const updateTaskValidator = taskFieldValidators(true);

module.exports = {
  ALLOWED_CATEGORIES,
  ALLOWED_STATUSES,
  createTaskValidator,
  updateTaskValidator,
};
