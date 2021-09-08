const fs = require("fs");
const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();
const { UserInfo } = require("./model");
const { loginAuth } = require("../middleware");

// dest 储存的目录
var upload = multer({ dest: "uploads/" });

// 上传接口
router.post("/api/upload", loginAuth, upload.any(), async (req, res) => {
  // 上传的文件信息
  // console.log(req.files[0]);
  const filename =
    req.files[0].path + path.parse(req.files[0].originalname).ext;

  // multer储存的文件的没有后缀的，获取原文件后缀并重命名
  fs.rename(req.files[0].path, filename, async (err) => {
    if (err) {
      res.send(err);
      return;
    } else {
      try {
        const updateRes = await UserInfo.findOneAndUpdate(
          {
            username: req.user.username,
          },
          {
            $set: {
              // 这里是前端访问的地址，因该用公网
              userImg:
                "http://159.75.122.22:3001/api/image/" +
                filename.replace("uploads\\", ""),
            },
          },
          {
            new: true,
          }
        );
        res.send({
          status: 200,
          message: "更新成功",
          userImg: updateRes.userImg
        });
      } catch {
        res.send({
          status: 400,
          message: "更新失败",
        });
      }
    }
  });
});

module.exports = router;
