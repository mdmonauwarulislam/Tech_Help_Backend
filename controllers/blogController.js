const httpsStatusCode = require("../constant/httpsStatusCode");
const Blog = require("../models/blogModel");

const createBlog = async (req, res) => {
  try {
    // Destructure the blog details from the request body
    const { title, content, image, category } = req.body;

    // Retrieve the user's ID from the authenticated request
    const userId = req.user?.user?.userId;
    console.log("User ID:", userId);

    // Check if the user ID is available, otherwise return an error
    if (!userId) {
      return res.status(httpsStatusCode.UNAUTHORIZED).json({
        success: false,
        message: "User not authenticated",
      });
    }

    // Create a new blog entry
    const newBlog = await Blog.create({
      title,
      content,
      image,
      category,
      createdBy: userId,
    });

    // Check if the blog was successfully created
    if (!newBlog) {
      return res.status(httpsStatusCode.BAD_REQUEST).json({
        success: false,
        message: "Blog creation failed",
      });
    }

    // Return a success response with the new blog data
    return res.status(httpsStatusCode.CREATED).json({
      success: true,
      message: "Blog created successfully",
      data: newBlog,
    });
  } catch (error) {
    // Catch and handle any server errors
    return res.status(httpsStatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

module.exports = { createBlog };
