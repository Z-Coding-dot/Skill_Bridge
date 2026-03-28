const express = require("express");
const {
  getTasks,
  getTask,
  postTask,
  updateTask,
  deleteTask,
} = require("../controllers/tasks.controller");
const { requireAuth } = require("../middleware/auth.middleware");
const validateRequest = require("../middleware/validation.middleware");
const {
  createTaskValidator,
  updateTaskValidator,
} = require("../validators/tasks.validator");

const router = express.Router();

router.get("/", getTasks);
router.get("/:id", getTask);
router.post("/", requireAuth, createTaskValidator, validateRequest, postTask);
router.put("/:id", requireAuth, updateTaskValidator, validateRequest, updateTask);
router.delete("/:id", requireAuth, deleteTask);

module.exports = router;
