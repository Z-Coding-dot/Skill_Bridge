const express = require("express");
const {
  getTasks,
  getTask,
  postTask,
  updateTask,
  deleteTask,
} = require("../controllers/tasks.controller");
const { requireAuth } = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/", getTasks);
router.get("/:id", getTask);
router.post("/", requireAuth, postTask);
router.put("/:id", requireAuth, updateTask);
router.delete("/:id", requireAuth, deleteTask);

module.exports = router;
