const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;
const httpsStatusCode = require("../constant/httpsStatusCode");
const Blog = require("../models/blogModel");
const studentModel = require("../models/studentModel");
const userModel = require("../models/userModel");

const createBlog = async (req, res) => {
  try {
    // Destructure the blog details from the request body
    const { title, content, image, category } = req.body;

    // Retrieve the user's ID from the authenticated request
    const userId = req.user?.user?.userId;
    console.log("User ID in blog:", userId);

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

    const user = await studentModel.findById(userId);
    if (!user) {
      return res.status(httpsStatusCode.NOT_FOUND).json({
        success: false,
        message: "User not found",
      });
    }
    user.blogPost.push(newBlog._id);
    await user.save();

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

const getBlogs = async (req, res) => {
  try {
    const userId = req.user?.user?.userId;
    console.log("User ID:", userId);
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
    res.status(httpsStatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: true,
      message: error.message || error,
    });
  }
};


const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    // Use Promise.all to wait for all asynchronous user fetch operations
    const blogsWithUsers = await Promise.all(
      blogs.map(async (item) => {
        const userResponse = await userModel.find({userId:item.createdBy}); // Fetch user data using the createdById
        if (userResponse && userResponse.length > 0) {
          let user;
          if (userResponse[0].role === "student") {
            // If the user is a student, fetch additional student information
            const userObjectId= new ObjectId(userResponse[0].userId);
            user = await studentModel.findById(userObjectId);
            // console.log("user:", user);
          }
         
          // Return the blog post with the user data
          return { ...item.toObject(), user }; 
        } else {
          return item; // Return the blog if no user is found (handle edge case)
        }
      })
    );

    console.log("blogsWithUsers:", blogsWithUsers);

    // If no blogs were found, return an error
    if (!blogsWithUsers || blogsWithUsers.length === 0) {
      return res.status(404).json({
        error: true,
        success: false,
        message: "No blog found",
      });
    }
    return res.status(200).json({
      error: false,
      success: true,
      data: blogsWithUsers,
    });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({
      success: false,
      error: true,
      message: error.message || error,
    });
  }
};

module.exports = { createBlog, getBlogs, getAllBlogs };
