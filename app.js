const express = require("express");
const router = express.Router();
const login = require("./router/login");
const video = require("./router/video");

const port = 3456;
const app = express();

app.use(express.json());
app.use(login);
app.use(video);

app.get("/api", (req, res) => {
  res.send("api server index");
});

app.listen(port, () => {
  console.log(`server listen on http://localhost:${port}`);
});
