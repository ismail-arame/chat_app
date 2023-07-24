const express = require("express");
const trimRequest = require("trim-request");
const authMiddleware = require("../middlewares/authMiddleware");
const { searchUsers } = require("../controllers/user.controller");

const router = express.Router();

router.get("/", trimRequest.all, authMiddleware, searchUsers);

module.exports = router;
