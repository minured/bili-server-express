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
  // console.log(req.body);
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

// 用户列表
router.get("/api/userlist", loginAuth, async (req, res) => {
  try {
    const userlist = await UserInfo.find()
    res.send({
      status: 200,
      userlist
    })
  } catch {
    res.send({
      status: 400
    })
  }

})

// 更新用户
router.post("/api/users/search", loginAuth, async (req, res) => {

  try {
    if (req.body.username) {
      const result = await UserInfo.find({
        username: req.body.username
      })
      res.send({
        status: 200,
        result
      })
    } else {
      const result = await UserInfo.find({
        nickname: req.body.nickname
      })
      res.send({
        status: 200,
        result
      })
    }

  } catch {
    res.send({
      status: 400
    })

  }
})

module.exports = router;
