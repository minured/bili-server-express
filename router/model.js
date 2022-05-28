const mongoose = require("mongoose");
const { MONGODB } = require("../private.js");

// 创建数据库库bilibili
mongoose.connect(MONGODB, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

// 定义文档模型 row
const userAuthSchema = new mongoose.Schema(
  {
    username: { type: String, unique: true },
    password: {
      type: String,
      set(val) {
        return require("bcryptjs").hashSync(val, 10);
      },
    },
  },
  { timestamps: true }
);
const videoSchema = new mongoose.Schema(
  {
    id: { type: String },
    name: String,
    introduction: String,
    categoryId: String,
    img: String,
    content: String,
    upperId: String,
  },
  { timestamps: true }
);
const userInfoSchema = new mongoose.Schema(
  {
    gender: Number,
    username: String,
    nickname: String,
    userImg: String,
    userDesc: String,
  },
  { timestamps: true }
);
const videoLikeSchema = new mongoose.Schema(
  {
    username: String,
    videoId: String,
    createAt: String,
  },
  { timestamps: true }
);
const categorySchema = new mongoose.Schema({
  name: String,
  id: Number,
});
const commentSchema = new mongoose.Schema({
  videoId: String,
  content: String,
  date: String,
  parentId: String,
  username: String,
  parentUser: String
});

// 创建文档集合 collections
// 这边UserAuth为创建的集合名，mongodb会自动加s，变为UserAuths
const UserAuth = mongoose.model("UserAuth", userAuthSchema);
const Video = mongoose.model("Video", videoSchema);
const UserInfo = mongoose.model("UserInfo", userInfoSchema);
const VideoLike = mongoose.model("VideoLike", videoLikeSchema);
const Category = mongoose.model("Category", categorySchema);
const Comment = mongoose.model("Comment", commentSchema);

// 删除集合里的所有文档
// UserAuth.db.dropCollection("userauths");
// Video.db.dropCollection("videos");

module.exports = { UserAuth, Video, UserInfo, VideoLike, Category, Comment };
