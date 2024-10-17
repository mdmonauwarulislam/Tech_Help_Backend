const httpsStatusCode = require("../constant/httpsStatusCode");
const responsibilityModel = require("../models/responsilibityModel");

// Create a new responsibility
const createResponsibility = async (req, res) => {
  try {
    const { title, responsibilities, certificateLink, skills } = req.body;
    const responsibility = await responsibilityModel.create({
      title,
      responsibilities,
      certificateLink,
      skills,
    });
    if (!responsibility) {
      return res.status(httpsStatusCode.BAD_REQUEST).json({
        success: false,
        message: "Could not create responsibility",
      });
    }
    return res.status(httpsStatusCode.CREATED).json({
      success: true,
      message: "Responsibility created successfully",
      data: responsibility,
    });
  } catch (error) {
    return res.status(httpsStatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

// Get all responsibilities
const getAllResponsibilities = async (req, res) => {
  try {
    const responsibilities = await responsibilityModel.find();
    if (!responsibilities) {
      return res.status(httpsStatusCode.NOT_FOUND).json({
        success: false,
        message: "Responsibilities not found",
      });
    }
    return res.status(httpsStatusCode.OK).json({
      success: true,
      message: "Responsibilities retrieved successfully",
      data: responsibilities,
    });
  } catch (error) {
    return res.status(httpsStatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

// Update a responsibility by ID
const updateResponsibility = async (req, res) => {
  try {
    const { title, responsibilities, certificateLink, skills } = req.body;
    const responsibility = await responsibilityModel.findByIdAndUpdate(
        req.params.id,
        {
            title,
            responsibilities,
            certificateLink,
            skills,
        },
    );
    if (!responsibility) {
        return res.status(httpsStatusCode.NOT_FOUND).json({
            success: false,
            message: "Responsibility not found",
        });
    }
    return res.status(httpsStatusCode.OK).json({
        success: true,
        message: "Responsibility updated successfully",
        data: responsibility,
    });
  } catch (error) {
    return res.status(httpsStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Something went wrong",
        error: error.message,
    });
  }
};

// Delete a responsibility by ID
const deleteResponsibility = async (req, res) => {
  try {
    const responsibility = await responsibilityModel.findByIdAndDelete(req.params.id);
    if (!responsibility) {
        return res.status(httpsStatusCode.NOT_FOUND).json({
            success: false,
            message: "Responsibility not found",
        });
    }
    return res.status(httpsStatusCode.OK).json({
        success: true,
        message: "Responsibility deleted successfully",
    });
  } catch (error) {
    return res.status(httpsStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Something went wrong",
        error: error.message,
    });
  }
};

module.exports = { createResponsibility, getAllResponsibilities, updateResponsibility, deleteResponsibility };