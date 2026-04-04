const express = require("express");
const {
  getConversations,
  getConversationMessages,
  createMessage,
  markConversationAsRead,
} = require("../controllers/messages.controller");
const { requireAuth } = require("../middleware/auth.middleware");

const router = express.Router();

router.use(requireAuth);

router.get("/conversations", getConversations);
router.get("/:userId", getConversationMessages);
router.post("/", createMessage);
router.patch("/:userId/read", markConversationAsRead);

module.exports = router;
