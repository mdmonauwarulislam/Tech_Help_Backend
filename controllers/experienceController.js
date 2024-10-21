const experienceModel = require('../models/experienceModel');
const httpsStatusCode = require('../constant/httpsStatusCode');

// Add Work Experience
const addWorkExperience = async (req, res) => {
  try {
    const { companyName, internshipType, companyLink, internshipTitle, location, startDate, endDate, currentlyWorking, projectDetails,  skills, certificateLink } = req.body;
    console.log(req.body);
    const workExperience = await experienceModel.create({
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
    if(!workExperience){
        return res.status(httpsStatusCode.BAD_REQUEST).json({
            success: false,
            message: 'Work experience not created'
        })
    }
    res.status(httpsStatusCode.CREATED).json({
        success: true,
        message: 'Work experience created successfully',
        data: workExperience
    });
  } catch (error) {
   return res.status(httpsStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Work experience not created',
        error: error.message
    });
  }
};

// Get All Work Experiences
const getAllWorkExperiences = async (req, res) => {
  try {
    const workExperiences = await experienceModel.find();
    if (!workExperiences) {
      return res.status(httpsStatusCode.NOT_FOUND).json({
        success: false, 
        message: 'Work experience not found',
     });
    }
    res.status(httpsStatusCode.OK).json({
        success: true,
        message: 'Work experience found',
        data: workExperiences
    });
  } catch (error) {
    res.status(httpsStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'something went wrong',
        error: error.message
    });
  }
};

const getSingleWorkExperience = async (req, res) => {
  try {
    const workExperience = await experienceModel.findById(req.params.id);
    if (!workExperience) {
      return res.status(httpsStatusCode.NOT_FOUND).json({
        success: false,
        message: 'Work experience not found',
      });
    }
    return res.status(httpsStatusCode.OK).json({
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
}


// Update Work Experience by ID
const updateWorkExperience = async (req, res) => {
  try {
    const { companyName, internshipType, companyLink, internshipTitle, location, startDate, endDate, currentlyWorking, projectDetails, skillsUsed, certificateLink } = req.body;
    const workExperience = await experienceModel.findByIdAndUpdate(req.params.id, {
      companyName,
      internshipType,
      companyLink,
      internshipTitle,
      location,
      startDate,
      endDate,
      currentlyWorking,
      projectDetails,
      skillsUsed,
      certificateLink,
    }, { new: true });
    if (!workExperience) {
      return res.status(httpsStatusCode.BAD_REQUEST).json({
        success: false,
        message: 'Work experience not updated',
      });
    }
    return res.status(httpsStatusCode.OK).json({
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

// Delete Work Experience by ID
const deleteWorkExperience = async (req, res) => {
  try {
    const workExperience = await experienceModel.findByIdAndDelete(req.params.id);
    if (!workExperience) {
      return res.status(httpsStatusCode.BAD_REQUEST).json({
        success: false,
        message: 'Work experience not deleted',
      });
    }
    return res.status(httpsStatusCode.OK).json({
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
  updateWorkExperience,
  deleteWorkExperience,
  getSingleWorkExperience
};
