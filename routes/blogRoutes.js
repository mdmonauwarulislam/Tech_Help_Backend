// blogRoutes.js
const express = require("express");
const router = express.Router();
const {
  createBlog,
  getBlogs,
  getAllBlogs,
  likeBlog,
  shareBlog,
  bookmarkBlog,
  addComment,
  replyToComment,
} = require("../controllers/blogController");
const { verifyToken } = require("../middleware/authMiddleware");

// Public routes
router.get("/getallblogs", getAllBlogs);
router.post("/:blogId/share", shareBlog);

// Authenticated routes
router.post("/createblog", verifyToken, createBlog);
router.get("/getblogs", verifyToken, getBlogs);
router.post("/:blogId/like", verifyToken, likeBlog);
router.post("/:blogId/bookmark", verifyToken, bookmarkBlog);
router.post("/:blogId/comment", verifyToken, addComment);
router.post("/:blogId/comment/:commentId/reply", verifyToken, replyToComment);

module.exports = router;
