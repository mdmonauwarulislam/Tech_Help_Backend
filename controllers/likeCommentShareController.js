const Blog = require("../models/likeCommentShare");
// Get a specific blog by ID
exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ error: "Blog not found" });
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch blog", details: error.message });
  }
};

// Like or Unlike a blog
exports.toggleLike = async (req, res) => {
  try {
    const { increment } = req.body; // `true` for like, `false` for unlike
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ error: "Blog not found" });

    blog.likes += increment ? 1 : -1;
    await blog.save();
    res.status(200).json({ likes: blog.likes });
  } catch (error) {
    res.status(500).json({ error: "Failed to update likes", details: error.message });
  }
};

// Add a comment to a blog
exports.addComment = async (req, res) => {
  try {
    const { text, userId } = req.body;
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ error: "Blog not found" });

    blog.comments.push({ text, user: userId });
    await blog.save();
    res.status(200).json(blog.comments);
  } catch (error) {
    res.status(500).json({ error: "Failed to add comment", details: error.message });
  }
};

// Update the share count for a blog
exports.updateShare = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ error: "Blog not found" });

    blog.shares += 1;
    await blog.save();
    res.status(200).json({ shares: blog.shares });
  } catch (error) {
    res.status(500).json({ error: "Failed to update shares", details: error.message });
  }
};
