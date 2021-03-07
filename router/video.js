const express = require("express");
const router = express.Router();
const { Video, Category, UserInfo } = require("./model");

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

// 视频详情
router.get("/api/video/:videoId", async (req, res) => {
  const video = await Video.findOne({
    id: req.params.videoId,
  });
  const category = await Category.findOne({
    id: video.categoryId,
  });
  const upper = await UserInfo.findOne({
    username: video.upperId,
  });

  res.send({
    video,
    category,
    upper,
  });
});

// 视频推荐
router.get("/api/commend", async (req, res) => {
  const commend = [];

  for (let i = 0; i < 10; i++) {
    const res = await Video.findOne({
      id: "bv000" + Math.floor(Math.random() * 299).toString(),
    });
    commend.push(res);
  }

  res.send(commend);
});
module.exports = router;
