const express = require("express");

const { VideoLike, Video, UserInfo } = require("./model");
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
  // console.log(queryRes);

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

// 我的收藏列表
router.get("/api/collections", loginAuth, async (req, res) => {
  let result = [];
  try {
    const likeRecord = await VideoLike.find({
      username: req.user.username,
    });

    // 查视频信息
    for (let i = 0; i < likeRecord.length; i++) {
      const video = await Video.findOne({
        id: likeRecord[i].videoId,
      });
      // 查用户名
      const userInfo = await UserInfo.findOne({
        username: video.upperId,
      });
      result.push({
        videoId: video.id,
        name: video.name,
        cover: video.img,
        upper: userInfo.nickname,
      });
    }

    res.send({
      status: 200,
      message: "查询成功",
      result,
    });
  } catch {
    res.send({
      status: 400,
      message: "查询失败",
    });
  }
});

// 删除收藏
router.post("/api/removeCollection", loginAuth, async (req, res) => {
  // console.log(req.body.videoId);
  // console.log(req.user.username);
  try {
    const removeRes = await VideoLike.deleteOne({
      username: req.user.username,
      videoId: req.body.videoId,
    });
    res.send({
      status: 200,
      message: "取消收藏成功",
      removeRes,
    });
  } catch {
    res.send({
      status: 400,
      message: "取消收藏失败",
    });
  }
});
module.exports = router;
