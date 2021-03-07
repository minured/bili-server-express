const express = require("express");
const router = express.Router();
const { Category, Video } = require("./model");

// 获取目录
router.get("/api/category", async (req, res) => {
  const category = await Category.find();

  res.send({
    status: 200,
    category,
  });
});

// 获取视频指定目录的视频列表
router.get("/api/category/:categoryId", async (req, res) => {
  const videos = await Video.find({
    categoryId: req.params.categoryId,
  });

  res.send({
    status: 200,
    videos,
  });
});

module.exports = router;
