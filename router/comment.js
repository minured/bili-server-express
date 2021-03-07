const express = require("express");
const router = express.Router();
const { loginAuth } = require("../middleware");
const { Comment, UserInfo } = require("./model");

// 获取评论
router.get("/api/comment/:videoId", async (req, res) => {
  let result = [];
  const commentRes = await Comment.find({
    videoId: req.params.videoId,
  });

  for (let i = 0; i < commentRes.length; i++) {
    // 添加该评论的用户信息
    const userInfo = await UserInfo.findOne({
      username: commentRes[i].username,
    });
    if (userInfo) {
      result.push({
        _id: commentRes[i]._id,
        content: commentRes[i].content,
        date: commentRes[i].date,
        parentId: commentRes[i].parentId,
        videoId: commentRes[i].videoId,
        username: commentRes[i].username,
        parentUser: commentRes[i].parentUser,
        userInfo,
      });
    }
  }
  res.send(result);
});

// 发表评论
router.post("/api/comment", loginAuth, async (req, res) => {
  let commentRes = null;
  let parentUsername = null;
  let parentUser = null;

  //   添加父评论的用户名
  //   定位父评论
  if (req.body.parentId) {
    const parentComment = await Comment.findOne({
      _id: req.body.parentId,
    });
    parentUsername = parentComment.username;

    const pUser = await UserInfo.findOne({
      username: parentUsername,
    });
    parentUser = pUser.nickname;
  }

  // 定位父评论的用户

  try {
    commentRes = await Comment.create({
      videoId: req.body.videoId,
      content: req.body.content,
      date: req.body.date,
      parentId: req.body.parentId,
      username: req.user.username,
      parentUser: parentUser,
    });
  } catch {
    res.send({
      status: 400,
      message: "评论失败",
    });
    return;
  }

  res.send({
    status: 200,
    message: "评论成功",
    commentRes,
  });
});

module.exports = router;
