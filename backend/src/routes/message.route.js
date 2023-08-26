const express = require("express");
const trimRequest = require("trim-request");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  sendMessage,
  getMessages,
  updateMessageStatus,
  getUnReadConversationMessages,
} = require("../controllers/message.controller");

const router = express.Router();

router.post("/", trimRequest.all, authMiddleware, sendMessage);
router.get("/:conversation_id", trimRequest.all, authMiddleware, getMessages);
router.get(
  "/getUnReadConversationMessages/:conversation_id",
  trimRequest.all,
  authMiddleware,
  getUnReadConversationMessages
);
router.post(
  "/updateMessageStatus",
  trimRequest.all,
  authMiddleware,
  updateMessageStatus
);

module.exports = router;
