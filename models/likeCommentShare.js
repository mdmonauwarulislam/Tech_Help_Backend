const mongoose = require("mongoose");

const blogCountSchema = new mongoose.Schema({
  title: String,
  content: String,
  image: String,
  category: String,
  createdAt: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  likes: { type: Number, default: 0 },
  comments: [
    {
      text: String,
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      createdAt: { type: Date, default: Date.now },
    },
  ],
  shares: { type: Number, default: 0 },
});

const likeCommentShare = mongoose.model("likeCommentShare", blogCountSchema);

module.exports = likeCommentShare;
