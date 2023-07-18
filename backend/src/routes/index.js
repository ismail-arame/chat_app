const express = require("express");
const authRoutes = require("./auth.route");
const conversationRoutes = require("./conversation.route");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/conversation", conversationRoutes);

module.exports = router;
