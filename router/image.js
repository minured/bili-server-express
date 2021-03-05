const express = require("express");
const { route } = require("./UserInfo");
const router = express.Router();
const fs = require("fs");
const path = require("path");

router.get("/api/image/:filename", (req, res) => {
  const { filename } = req.params;
  console.log("../uploads/" + filename);

  try {
    //   注意这里的路由是指 执行处的app.js
    const content = fs.readFileSync("./uploads/" + filename);
    res.setHeader("Content-Type", "image/png");
    res.send(content);
  } catch {
    console.log("err");
    res.send(null);
  }
});

module.exports = router;
