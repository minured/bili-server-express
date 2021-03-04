const express = require("express");
const router = require("./login");
const route = express.Router();
const { Video } = require("./model");
const { loginAuth } = require("../middleware");

// 视频列表
router.get("/api/video", loginAuth, async (req, res) => {
  const videos = await Video.find();
  res.send(req.user);
});

router.post("/api/video", async (req, res) => {
  console.log(req.body);
  video = await Video.create({
    id: req.body.id,
    introduction: req.body.introduction,
  });

  res.send(video);
});

module.exports = router;
