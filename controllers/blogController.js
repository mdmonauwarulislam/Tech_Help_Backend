const mongoose = require("mongoose");
const httpsStatusCode = require("../constant/httpsStatusCode");
const Blog = require("../models/blogModel");
const studentModel = require("../models/studentModel");
const userModel = require("../models/userModel");

// 1. Create Blog
const createBlog = async (req, res) => {
  try {
    const { title, content, image, category } = req.body;
    const userId = req.user?.user?.userId;

    console.log("Creating blog for user:", userId);

    if (!userId) {
      console.error("No userId found in request");
      return res.status(httpsStatusCode.UNAUTHORIZED).json({
        success: false,
        message: "User ID not found in token",
      });
    }

    const newBlog = await Blog.create({
      title,
      content,
      image,
      category,
      createdBy: userId,
    });

    const user = await studentModel.findById(userId);
    if (!user) {
      return res.status(httpsStatusCode.NOT_FOUND).json({
        success: false,
        message: "User not found in database",
      });
    }

    user.blogPost.push(newBlog._id);
    await user.save();

    return res.status(httpsStatusCode.CREATED).json({
      success: true,
      message: "Blog created successfully",
      data: newBlog,
    });
  } catch (error) {
    console.error("Blog creation error:", error);
    return res.status(httpsStatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// 2. Get Blogs for Authenticated User
const getBlogs = async (req, res) => {
  try {
    const userId = req.user?.user?.userId;
    const user = await studentModel.findById(userId).populate("blogPost");

    if (!user) {
      return res.status(httpsStatusCode.NOT_FOUND).json({
        error: true,
        success: false,
        message: "No blog found",
      });
    }

    return res.status(httpsStatusCode.OK).json({
      error: false,
      success: true,
      data: user.blogPost,
    });
  } catch (error) {
    return res.status(httpsStatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: true,
      message: error.message || error,
    });
  }
};

// 3. Get All Blogs (Public)
const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate(
      "createdBy",
      "username profilePicture"
    );

    if (!blogs || blogs.length === 0) {
      return res.status(httpsStatusCode.NOT_FOUND).json({
        error: true,
        success: false,
        message: "No blogs found",
      });
    }

    return res.status(httpsStatusCode.OK).json({
      error: false,
      success: true,
      data: blogs,
    });
  } catch (error) {
    return res.status(httpsStatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: true,
      message: error.message || error,
    });
  }
};

// 4. Like Blog
const likeBlog = async (req, res) => {
  try {
    const { blogId } = req.params;
    const userId = req.user?.user?.userId;

    if (!userId) {
      return res.status(httpsStatusCode.UNAUTHORIZED).json({
        success: false,
        message: "User not authenticated",
      });
    }

    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(httpsStatusCode.NOT_FOUND).json({
        success: false,
        message: "Blog not found",
      });
    }

    const likeIndex = blog.likes.indexOf(userId);
    if (likeIndex === -1) {
      blog.likes.push(userId);
    } else {
      blog.likes.splice(likeIndex, 1);
    }

    await blog.save();

    return res.status(httpsStatusCode.OK).json({
      success: true,
      message: likeIndex === -1 ? "Blog liked" : "Blog unliked",
      data: {
        likes: blog.likes.length,
        isLiked: likeIndex === -1,
      },
    });
  } catch (error) {
    return res.status(httpsStatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// 5. Share Blog
const shareBlog = async (req, res) => {
  try {
    const { blogId } = req.params;
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      { $inc: { shares: 1 } },
      { new: true }
    );

    if (!blog) {
      return res.status(httpsStatusCode.NOT_FOUND).json({
        success: false,
        message: "Blog not found",
      });
    }

    return res.status(httpsStatusCode.OK).json({
      success: true,
      message: "Blog share counted",
      data: {
        shares: blog.shares,
      },
    });
  } catch (error) {
    return res.status(httpsStatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// 6. Bookmark Blog
const bookmarkBlog = async (req, res) => {
  try {
    const { blogId } = req.params;
    const userId = req.user?.user?.userId;

    if (!userId) {
      return res.status(httpsStatusCode.UNAUTHORIZED).json({
        success: false,
        message: "User not authenticated",
      });
    }

    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(httpsStatusCode.NOT_FOUND).json({
        success: false,
        message: "Blog not found",
      });
    }

    const bookmarkIndex = blog.bookmarks.indexOf(userId);
    if (bookmarkIndex === -1) {
      blog.bookmarks.push(userId);
    } else {
      blog.bookmarks.splice(bookmarkIndex, 1);
    }

    await blog.save();

    // Update user's bookmarks
    const user = await userModel.findOne({ userId: userId });
    if (user) {
      const userBookmarkIndex = user.bookmarks.indexOf(blogId);
      if (userBookmarkIndex === -1) {
        user.bookmarks.push(blogId);
      } else {
        user.bookmarks.splice(userBookmarkIndex, 1);
      }
      await user.save();
    }

    return res.status(httpsStatusCode.OK).json({
      success: true,
      message: bookmarkIndex === -1 ? "Blog bookmarked" : "Bookmark removed",
      data: {
        isBookmarked: bookmarkIndex === -1,
      },
    });
  } catch (error) {
    return res.status(httpsStatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// 7. Add Comment
const addComment = async (req, res) => {
  try {
    const { blogId } = req.params;
    const { text } = req.body;
    const userId = req.user?.user?.userId;

    if (!userId) {
      return res.status(httpsStatusCode.UNAUTHORIZED).json({
        success: false,
        message: "User not authenticated",
      });
    }

    if (!text) {
      return res.status(httpsStatusCode.BAD_REQUEST).json({
        success: false,
        message: "Comment text is required",
      });
    }

    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(httpsStatusCode.NOT_FOUND).json({
        success: false,
        message: "Blog not found",
      });
    }

    const newComment = {
      user: userId,
      text: text,
      replies: [],
    };

    blog.comments.push(newComment);
    await blog.save();

    const populatedBlog = await Blog.findById(blogId)
      .populate({
        path: "comments.user",
        select: "username profilePicture",
      })
      .populate({
        path: "comments.replies.user",
        select: "username profilePicture",
      });

    const addedComment =
      populatedBlog.comments[populatedBlog.comments.length - 1];

    return res.status(httpsStatusCode.CREATED).json({
      success: true,
      message: "Comment added successfully",
      data: addedComment,
    });
  } catch (error) {
    return res.status(httpsStatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// 8. Reply to Comment
const replyToComment = async (req, res) => {
  try {
    const { blogId, commentId } = req.params;
    const { text } = req.body;
    const userId = req.user?.user?.userId;

    if (!userId) {
      return res.status(httpsStatusCode.UNAUTHORIZED).json({
        success: false,
        message: "User not authenticated",
      });
    }

    if (!text) {
      return res.status(httpsStatusCode.BAD_REQUEST).json({
        success: false,
        message: "Reply text is required",
      });
    }

    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(httpsStatusCode.NOT_FOUND).json({
        success: false,
        message: "Blog not found",
      });
    }

    const comment = blog.comments.id(commentId);
    if (!comment) {
      return res.status(httpsStatusCode.NOT_FOUND).json({
        success: false,
        message: "Comment not found",
      });
    }

    const newReply = {
      user: userId,
      text: text,
    };

    comment.replies.push(newReply);
    await blog.save();

    const populatedBlog = await Blog.findById(blogId)
      .populate({
        path: "comments.user",
        select: "username profilePicture",
      })
      .populate({
        path: "comments.replies.user",
        select: "username profilePicture",
      });

    const updatedComment = populatedBlog.comments.id(commentId);

    return res.status(httpsStatusCode.CREATED).json({
      success: true,
      message: "Reply added successfully",
      data: updatedComment,
    });
  } catch (error) {
    return res.status(httpsStatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

module.exports = {
  createBlog,
  getBlogs,
  getAllBlogs,
  likeBlog,
  shareBlog,
  bookmarkBlog,
  addComment,
  replyToComment,
};
