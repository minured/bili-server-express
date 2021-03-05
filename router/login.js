const express = require("express");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserAuth, UserInfo } = require("./model");
const { PRIVATE_KEY } = require("../private");
const router = express.Router();

// 注册
router.post("/api/register", async (req, res) => {
  // 写入用户账号密码
  let user = null;
  try {
    user = await UserAuth.create({
      username: req.body.username,
      password: req.body.password,
    });
  } catch (err) {
    res.send({
      status: 400,
      message: "用户名已存在",
    });
    return;
  }

  // 生成token
  const token = jwt.sign(
    {
      id: user._id,
    },
    PRIVATE_KEY
  );

  // userInfo集合中 写入用户昵称
  try {
    userInfo = await UserInfo.create({
      gender: 0,
      username: user.username,
      nickname: req.body.nickname,
      userImg: null,
      userDesc: null,
    });
  } catch {
    console.log(req.body.nickname);
  }

  res.send({
    status: 200,
    message: "注册成功",
    username: user.username,
    token,
  });
});

// 登录
router.post("/api/login", async (req, res) => {
  // 通过username从数据库找出信息
  const user = await UserAuth.findOne({
    username: req.body.username,
  });

  // 用户存在判断
  if (!user) {
    return res.status(422).send({
      message: "用户不存在",
    });
  }
  // bcrypt匹配密码
  const isPasswordValid = bcryptjs.compareSync(
    req.body.password,
    user.password
  );
  if (!isPasswordValid) {
    res.send({
      message: "密码错误",
    });
    return;
  }

  // 生成token
  const token = jwt.sign(
    {
      id: user._id,
    },
    PRIVATE_KEY
  );
  console.log(token);

  res.send({
    message: "登陆成功",
    username: user.username,
    token,
  });
});
// 用户列表
router.get("/api/users", async (req, res) => {
  const users = await UserAuth.find();
  res.send(users);
});

module.exports = router;
