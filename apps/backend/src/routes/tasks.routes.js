const express = require("express");
const {
  getTasks,
  getTask,
  postTask,
} = require("../controllers/tasks.controller");

const router = express.Router();

router.get("/", getTasks);
router.get("/:id", getTask);
router.post("/", postTask);

module.exports = router;
