const express = require("express");
const router = express.Router();
const { Video } = require("./model");

// 视频列表
router.get("/api/videos", async (req, res) => {
  const videos = await Video.find();
  res.send(videos);
});

// 添加视频
router.post("/api/video", async (req, res) => {
  console.log(req.body);
  video = await Video.create({
    id: req.body.id,
    introduction: req.body.introduction,
  });

  res.send(video);
});

module.exports = router;
