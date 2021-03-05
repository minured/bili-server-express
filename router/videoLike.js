const express = require("express");

const { VideoLike } = require("./model");
const router = express.Router();
const { loginAuth } = require("../middleware");

// 查询收藏状态
router.get("/api/video/like", loginAuth, async (req, res) => {
  const queryRes = await VideoLike.find({
    username: req.user.username,
  });

  queryRes.forEach((item) => {
    if (item.videoId === req.body.videoId) {
      res.send({
        status: 200,
        message: "已收藏",
      });
    }
  });

  res.send({
    status: 400,
    message: "未收藏",
  });
});

// 收藏
router.post("/api/video/like", loginAuth, async (req, res) => {
  try {
    const likeRes = await VideoLike.create({
      username: req.user.username,
      videoId: req.body.videoId,
    });
  } catch {
    res.send({
      status: 400,
      message: "收藏失败",
    });
  }

  res.send({
    status: 200,
    message: "收藏成功",
  });
});

module.exports = router;
