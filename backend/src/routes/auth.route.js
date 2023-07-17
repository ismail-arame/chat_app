const express = require("express");
const trimRequest = require("trim-request");
const {
  register,
  login,
  logout,
  refreshToken,
} = require("../controllers/auth.controller");

//middlewares
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

//register Endpoint
router.post("/register", trimRequest.all, register);
router.post("/login", trimRequest.all, login);
router.post("/logout", trimRequest.all, logout);
router.post("/refreshtoken", trimRequest.all, refreshToken);
router.get(
  "/testingauthmiddleware",
  authMiddleware,
  trimRequest.all,
  (req, res) => {
    res.send("hello");
  }
);

module.exports = router;
