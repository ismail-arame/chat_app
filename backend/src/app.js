const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("hello from the end of the world");
});

module.exports = app;
