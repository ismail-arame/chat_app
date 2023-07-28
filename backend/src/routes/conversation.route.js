const express = require("express");
const trimRequest = require("trim-request");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  create_open_conversation,
  getConversations,
  getCreatedUserConversation,
} = require("../controllers/conversation.controller");

const router = express.Router();

//create or open a conversation with another user
router.post("/", trimRequest.all, authMiddleware, create_open_conversation);

//get all user conversations
router.get("/", trimRequest.all, authMiddleware, getConversations);

router.get(
  "/:receiver_id",
  trimRequest.all,
  authMiddleware,
  getCreatedUserConversation
);

module.exports = router;
