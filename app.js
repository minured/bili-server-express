const express = require("express");
const router = express.Router();
const login = require("./router/login");
const video = require("./router/video");
const userInfo = require("./router/userInfo");
const videoLike = require("./router/videoLike");
const cors = require("cors");
const upload = require("./router/upload");
const image = require("./router/image");
const home = require("./router/home");
const comment = require("./router/comment");
const dayjs = require("dayjs")


const port = 3001;
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
  console.log(`${dayjs().format("YYYY-MM-DD HH:mm:ss")}: Server listen on http://localhost:${port}`);
});

//直接捕获method()未定义函数，Node进程未被退出。
process.on('uncaughtException', function (err) {
  console.log(`${dayjs().format("YYYY-MM-DD HH:mm:ss")}: Caught Exception:`);
  console.log(err);
  console.log("\n");
});
