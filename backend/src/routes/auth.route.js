const express = require("express");
const trimRequest = require("trim-request");
const {
  register,
  login,
  logout,
  refreshToken,
} = require("../controllers/auth.controller");

const router = express.Router();

//register Endpoint
router.post("/register", trimRequest.all, register);
router.post("/login", trimRequest.all, login);
router.post("/logout", trimRequest.all, logout);
router.post("/refreshToken", trimRequest.all, refreshToken);

module.exports = router;
