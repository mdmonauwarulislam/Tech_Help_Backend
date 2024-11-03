const express = require("express");
const Router = express.Router();

const { createBlog, getBlogs } = require("../controllers/blogController");
const { verifyToken } = require("../middleware/authMiddleware");

Router.post("/createblog", verifyToken, createBlog);
Router.get("/getblogs", verifyToken, getBlogs);

module.exports = Router;
