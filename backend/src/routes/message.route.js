const express = require("express");
const trimRequest = require("trim-request");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  sendMessage,
  getMessages,
  updateMessageStatus,
} = require("../controllers/message.controller");

const router = express.Router();

router.post("/", trimRequest.all, authMiddleware, sendMessage);
router.get("/:conversation_id", trimRequest.all, authMiddleware, getMessages);
router.post(
  "/updateMessageStatus",
  trimRequest.all,
  authMiddleware,
  updateMessageStatus
);

module.exports = router;
