const express = require("express");
const router = express.Router();


// 获取目录
router.get("/api/category", async (req, res) => {
  
  res.send("category");
});

// 添加视频
router.post("/api/video", async (req, res) => {
  console.log(req.body);
  video = await Video.create({
    id: req.body.id,
    introduction: req.body.introduction,
  });

  res.send(video);
});



module.exports = router;
