const express = require("express");
const { requireAuth } = require("../middleware/auth.middleware");
const { requireAdmin } = require("../middleware/admin.middleware");
const {
  getStats, getUsers, deleteUser,
  getTasks, deleteTask,
  getFeedbacks, deleteFeedback,
} = require("../controllers/admin.controller");

const router = express.Router();

router.use(requireAuth, requireAdmin);

router.get("/stats",             getStats);
router.get("/users",             getUsers);
router.delete("/users/:id",      deleteUser);
router.get("/tasks",             getTasks);
router.delete("/tasks/:id",      deleteTask);
router.get("/feedbacks",         getFeedbacks);
router.delete("/feedbacks/:id",  deleteFeedback);

module.exports = router;