const express = require("express");

const { VideoLike, Video } = require("./model");
const router = express.Router();
const { loginAuth } = require("../middleware");
const { request } = require("express");

// 查询收藏状态
router.get("/api/video/like/:videoId", loginAuth, async (req, res) => {
  const queryRes = await VideoLike.findOne({
    username: req.user.username,
    videoId: req.params.videoId,
  });

  if (queryRes) {
    res.send({
      isLiked: true,
      message: "已收藏",
    });
    return;
  }
  res.send({
    isLiked: false,
    message: "未收藏",
  });
});

// 收藏视频
router.post("/api/video/like/:videoId", loginAuth, async (req, res) => {
  // 查一遍数据库，没有就创建，有就取反
  const queryRes = await VideoLike.findOne({
    username: req.user.username,
    videoId: req.params.videoId,
  });
  console.log(queryRes);

  if (queryRes) {
    await VideoLike.deleteOne({
      username: req.user.username,
      videoId: req.params.videoId,
    });
    res.send({
      isLiked: false,
      message: "取消收藏",
    });
  } else {
    await VideoLike.create({
      username: req.user.username,
      videoId: req.params.videoId,
    });
    res.send({
      isLiked: true,
      message: "收藏成功",
    });
  }
});

module.exports = router;
