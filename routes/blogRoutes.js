const express = require("express");
const Router = express.Router();
const blogController = require("../controllers/likeCommentShareController");
const {
  createBlog,
  getBlogs,
  getAllBlogs,
} = require("../controllers/blogController");
const { verifyToken } = require("../middleware/authMiddleware");

Router.post("/createblog", verifyToken, createBlog);
Router.get("/getblogs", verifyToken, getBlogs);
Router.get("/getallblogs", verifyToken, getAllBlogs);

// like comment share routes
Router.post("/:id/like", blogController.toggleLike);
Router.post("/:id/comment", blogController.addComment);
Router.post("/:id/share", blogController.updateShare);

module.exports = Router;
