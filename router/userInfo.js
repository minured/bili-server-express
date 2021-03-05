const express = require("express");
const router = express.Router();
const { UserInfo } = require("./model");
const { loginAuth } = require("../middleware");

// 查询用户信息
router.get("/api/user", loginAuth, async (req, res) => {
  const userInfo = await UserInfo.findOne({
    username: req.user.username,
  });

  res.send(userInfo);
});
// 更新用户信息
router.put("/api/user", loginAuth, async (req, res) => {
  console.log(req.body);
  let userInfo;
  try {
    userInfo = await UserInfo.findOneAndUpdate(
      {
        username: req.user.username,
      },
      {
        $set: {
          ...req.body,
        },
      },
      {
        new: true,
      }
    );
  } catch {
    res.send({
      status: 400,
      message: "更新失败",
    });
  }

  res.send({
    status: 200,
    message: "更新成功",
    userInfo,
  });
});

module.exports = router;
