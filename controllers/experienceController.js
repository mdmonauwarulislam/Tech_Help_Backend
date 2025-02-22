const experienceModel = require('../models/experienceModel');
const httpsStatusCode = require('../constant/httpsStatusCode');

// Add Work Experience for Specific User
const addWorkExperience = async (req, res) => {
  try {
    const userId = req.user.user.userId;
    const { companyName, internshipType, companyLink, internshipTitle, location, startDate, endDate, currentlyWorking, projectDetails, skills, certificateLink } = req.body;

    const workExperience = await experienceModel.create({
      user: userId,
      companyName,
      internshipType,
      companyLink,
      internshipTitle,
      location,
      startDate,
      endDate,
      currentlyWorking,
      projectDetails,
      skillsUsed: skills,
      certificateLink,
    });

    res.status(httpsStatusCode.CREATED).json({
      success: true,
      message: 'Work experience created successfully',
      data: workExperience
    });

  } catch (error) {
    res.status(httpsStatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Work experience not created',
      error: error.message
    });
  }
};

// Get All Work Experiences for Specific User
const getAllWorkExperiences = async (req, res) => {
  try {
    const userId = req.user.user.userId;
    const workExperiences = await experienceModel.find({ user: userId });

    if (!workExperiences) {
      return res.status(httpsStatusCode.NOT_FOUND).json({
        success: false,
        message: 'Work experiences not found',
      });
    }

    res.status(httpsStatusCode.OK).json({
      success: true,
      message: 'Work experiences found',
      data: workExperiences
    });

  } catch (error) {
    res.status(httpsStatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Something went wrong',
      error: error.message
    });
  }
};

// Get Single Work Experience by ID (for Specific User)
const getSingleWorkExperience = async (req, res) => {
  try {
    const userId = req.user.user.userId;

    const experienceId = req.params.id;

    const workExperience = await experienceModel.findOne({ _id: experienceId, user: userId });

    if (!workExperience) {
      return res.status(httpsStatusCode.NOT_FOUND).json({
        success: false,
        message: 'Work experience not found',
      });
    }

    res.status(httpsStatusCode.OK).json({
      success: true,
      message: 'Work experience found',
      data: workExperience
    });

  } catch (error) {
    res.status(httpsStatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Something went wrong',
      error: error.message
    });
  }
};

// Update Work Experience by ID (for Specific User)
const updateWorkExperience = async (req, res) => {
  try {
    const userId = req.user.user.userId;
    const experienceId = req.params.id;
    const { companyName, internshipType, companyLink, internshipTitle, location, startDate, endDate, currentlyWorking, projectDetails, skillsUsed, certificateLink } = req.body;

    const workExperience = await experienceModel.findOneAndUpdate(
      { _id: experienceId, user: userId },
      { companyName, internshipType, companyLink, internshipTitle, location, startDate, endDate, currentlyWorking, projectDetails, skillsUsed, certificateLink },
      { new: true }
    );

    if (!workExperience) {
      return res.status(httpsStatusCode.BAD_REQUEST).json({
        success: false,
        message: 'Work experience not updated',
      });
    }

    res.status(httpsStatusCode.OK).json({
      success: true,
      message: 'Work experience updated successfully',
      data: workExperience
    });

  } catch (error) {
    res.status(httpsStatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Something went wrong',
      error: error.message
    });
  }
};

// Delete Work Experience by ID (for Specific User)
const deleteWorkExperience = async (req, res) => {
  try {
    const userId = req.user.user.userId;
    const experienceId = req.params.id;

    const workExperience = await experienceModel.findOneAndDelete({ _id: experienceId, user: userId });

    if (!workExperience) {
      return res.status(httpsStatusCode.BAD_REQUEST).json({
        success: false,
        message: 'Work experience not deleted',
      });
    }

    res.status(httpsStatusCode.OK).json({
      success: true,
      message: 'Work experience deleted successfully',
      data: workExperience
    });

  } catch (error) {
    res.status(httpsStatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Something went wrong',
      error: error.message
    });
  }
};

module.exports = {
  addWorkExperience,
  getAllWorkExperiences,
  getSingleWorkExperience,
  updateWorkExperience,
  deleteWorkExperience
};
