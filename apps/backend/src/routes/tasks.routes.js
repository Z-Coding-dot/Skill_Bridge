const express = require("express");
const {
  getTasks,
  getTask,
  postTask,
  updateTask,
  deleteTask,

} = require("../controllers/tasks.controller");

const router = express.Router();

router.get("/", getTasks);
router.get("/:id", getTask);
router.post("/", postTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);


module.exports = router;
