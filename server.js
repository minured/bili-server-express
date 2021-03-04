const express = require("express");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserAuth } = require("./model");
const { PRIVATE_KEY } = require("./private");

const port = 3456;
const app = express();

app.use(express.json());

// TODO /api设置为通用路径
app.get("/api", (req, res) => {
  res.send("node server");
});

// 注册
app.post("/api/register", async (req, res) => {
  let user = null;
  try {
    user = await UserAuth.create({
      username: req.body.username,
      password: req.body.password,
    });
  } catch (err) {
    console.log("mongodb创建数据错误");
    res.send({
      message: "用户名已存在",
    });
    return;
  }
  res.send({
    message: "注册成功",
    userAuth: {
      username: user.username,
      password: user.password,
    },
  });
});

app.post("/api/login", async (req, res) => {
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

app.listen(port, () => {
  console.log(`server listen on http://localhost:${port}`);
});
