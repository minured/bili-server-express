const mongoose = require("mongoose");
const { User } = require("../../minu/node-express/model");

// 创建数据库库bilibili
mongoose.connect("mongodb://localhost:27017/bilibili", {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// 定义文档模型 row
const userAuthSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: {
    type: String,
    set(val) {
      return require("bcryptjs").hashSync(val, 10);
    },
  },
});
const videoSchema = new mongoose.Schema({
  id: { type: String },
  name: String,
  introduction: String,
  category: String,
  img: String,
  content: String,
  upUserInfo: {
    name: String,
    user_img: String,
  },
  createAt: String,
});

// 创建文档集合 collections
// 这边UserAuth为创建的集合名，mongodb会自动加s，变为UserAuths
const UserAuth = mongoose.model("UserAuth", userAuthSchema);
const Video = mongoose.model("Video", videoSchema);

// 删除集合里的所有文档
// UserAuth.db.dropCollection("userauths");
// Video.db.dropCollection("videos");

module.exports = { UserAuth, Video };
