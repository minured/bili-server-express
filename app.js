const express = require("express");
const router = express.Router();
const login = require("./router/login");
const video = require("./router/video");
const userInfo = require("./router/UserInfo");
const videoLike = require("./router/videoLike");
const cors = require("cors");
const upload = require("./router/upload");
const image = require("./router/image");
const home = require("./router/home");
const comment = require("./router/comment");

const port = 3456;
const app = express();

// 注意中间件顺序
app.use(express.json());
app.use(cors());
app.use(login);
app.use(video);
app.use(userInfo);
app.use(videoLike);
app.use(upload);
app.use(image);
app.use(home);
app.use(comment);

app.get("/api", (req, res) => {
  res.send("api server index");
});

app.listen(port, () => {
  console.log(`server listen on http://localhost:${port}`);
});
