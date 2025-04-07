const httpsStatusCode = require("../constant/httpsStatusCode");
const addEducationModel = require("../models/addEducationModel");
const studentModel = require("../models/studentModel");
const mentorModel = require("../models/mentorModel");
const mongoose = require("mongoose");

// Add College Education (for both Student & Mentor)
const addCollegeEducation = async (req, res) => {
  try {
    const { university, studyfield, degree, grade, startyear, endyear } = req.body;
    const userId = req.user.user.userId;

    if (!userId) {
      return res.status(httpsStatusCode.UNAUTHORIZED).json({
        success: false,
        message: "User must be logged in",
      });
    }

    // Ensure `degree` is a valid ObjectId or `null`
    const degreeValue = degree && mongoose.Types.ObjectId.isValid(degree) ? degree : null;

    // Check if the user already has an education document
    let existingEducation = await addEducationModel.findOne({ user: userId });

    if (!existingEducation) {
      // Create new education record
      const newEducation = new addEducationModel({
        user: userId,
        college: [
          {
            collegeName: university,
            fieldOfStudy: studyfield,
            degree: degreeValue,
            grade,
            startYear: startyear,
            endYear: endyear,
          },
        ],
      });

      await newEducation.save();

      // Add education reference to Student and Mentor models
      await studentModel.findByIdAndUpdate(userId, { education: newEducation._id });
      await mentorModel.findByIdAndUpdate(userId, { education: newEducation._id });

      return res.status(httpsStatusCode.CREATED).json({
        success: true,
        message: "College education added successfully",
        data: newEducation,
      });
    }

    // If education exists, update it
    existingEducation.college.push({
      collegeName: university,
      fieldOfStudy: studyfield,
      degree: degreeValue,
      grade,
      startYear: startyear,
      endYear: endyear,
    });

    await existingEducation.save();

    return res.status(httpsStatusCode.OK).json({
      success: true,
      message: "College education updated successfully",
      data: existingEducation,
    });
  } catch (error) {
    return res.status(httpsStatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

// Add School Education (for both Student & Mentor)
const addSchoolEducation = async (req, res) => {
  try {
    const { schoolname, classof, passoutyear, finalgrade } = req.body;
    const userId = req.user.user.userId;

    if (!userId) {
      return res.status(httpsStatusCode.UNAUTHORIZED).json({
        success: false,
        message: "User must be logged in",
      });
    }

    let existingEducation = await addEducationModel.findOne({ user: userId });

    if (!existingEducation) {
      // Create new education record
      existingEducation = new addEducationModel({
        user: userId,
        school: [
          {
            schoolName: schoolname,
            classof,
            yearOfPassing: passoutyear,
            grade: finalgrade,
          },
        ],
      });

      await existingEducation.save();

      // Add education reference to Student and Mentor models
      await studentModel.findByIdAndUpdate(userId,  {$push:{ education: existingEducation._id }});
      await mentorModel.findByIdAndUpdate(userId, {$push:{ education: existingEducation._id }});

      return res.status(httpsStatusCode.CREATED).json({
        success: true,
        message: "School education added successfully",
        data: existingEducation,
      });
    }

    // If education exists, update it
    existingEducation.school.push({
      schoolName: schoolname,
      classof,
      yearOfPassing: passoutyear,
      grade: finalgrade,
    });

    await existingEducation.save();

    return res.status(httpsStatusCode.OK).json({
      success: true,
      message: "School education updated successfully",
      data: existingEducation,
    });
  } catch (error) {
    return res.status(httpsStatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

// Get College Education (for both Student & Mentor)
const getCollegeEducation = async (req, res) => {
  try {
    const userId = req.user.user.userId;

    if (!userId) {
      return res.status(httpsStatusCode.UNAUTHORIZED).json({
        success: false,
        message: "User must be logged in",
      });
    }

    const existingEducation = await addEducationModel.findOne({ user: userId });

    if (!existingEducation || existingEducation.college.length === 0) {
      return res.status(httpsStatusCode.NOT_FOUND).json({
        success: false,
        message: "No college education found",
      });
    }

    return res.status(httpsStatusCode.OK).json({
      success: true,
      message: "College education retrieved successfully",
      data: existingEducation.college,
    });
  } catch (error) {
    return res.status(httpsStatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

// Get School Education (for both Student & Mentor)
const getSchoolEducation = async (req, res) => {
  try {
    const userId = req.user.user.userId;

    if (!userId) {
      return res.status(httpsStatusCode.UNAUTHORIZED).json({
        success: false,
        message: "User must be logged in",
      });
    }

    const existingEducation = await addEducationModel.findOne({ user: userId });

    if (!existingEducation || existingEducation.school.length === 0) {
      return res.status(httpsStatusCode.NOT_FOUND).json({
        success: false,
        message: "No school education found",
      });
    }

    return res.status(httpsStatusCode.OK).json({
      success: true,
      message: "School education retrieved successfully",
      data: existingEducation.school,
    });
  } catch (error) {
    return res.status(httpsStatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

// Get Education List (for both Student & Mentor)
const getEducationList = async (req, res) => {
  try {
    const userId = req.user.user.userId;

    if (!userId) {
      return res.status(httpsStatusCode.UNAUTHORIZED).json({
        success: false,
        message: "User must be logged in",
      });
    }

    const existingEducation = await addEducationModel
      .findOne({ user: userId })
      .populate("college.degree");

    if (!existingEducation) {
      return res.status(httpsStatusCode.NOT_FOUND).json({
        success: false,
        message: "Education not found",
      });
    }

    return res.status(httpsStatusCode.OK).json({
      success: true,
      message: "Education retrieved successfully",
      data: existingEducation,
    });
  } catch (error) {
    return res.status(httpsStatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

// Delete Education (for both Student & Mentor)
const deleteEducation = async (req, res) => {
  try {
    const userId = req.user.user.userId;

    await addEducationModel.deleteOne({ user: userId });

    return res.status(httpsStatusCode.OK).json({
      success: true,
      message: "Education deleted successfully",
    });
  } catch (error) {
    return res.status(httpsStatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

module.exports = {
  addCollegeEducation,
  addSchoolEducation,
  getCollegeEducation,
  getSchoolEducation,
  getEducationList,
  deleteEducation,
};
