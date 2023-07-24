const express = require("express");
const authRoutes = require("./auth.route");
const conversationRoutes = require("./conversation.route");
const messageRoutes = require("./message.route");
const userRoutes = require("./user.route");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/conversation", conversationRoutes);
router.use("/message", messageRoutes);
router.use("/user", userRoutes);

module.exports = router;
