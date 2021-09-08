const express = require("express");
const router = express.Router();
const fs = require("fs");

router.get("/api/image/uploads/:filename", (req, res) => {
  // console.log("image");
  const { filename } = req.params;
  // console.log("../uploads/" + filename);

  try {
    //   注意这里的路由是指 执行处的app.js
    const content = fs.readFileSync("./uploads/" + filename);
    res.setHeader("Content-Type", "image/png");
    res.send(content);
  } catch {
    // console.log("err");
    res.send(null);
  }
});

module.exports = router;
