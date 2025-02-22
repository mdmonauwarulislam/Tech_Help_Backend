const httpsStatusCode = require("../constant/httpsStatusCode");
const addEducationModel = require("../models/addEducationModel");
const studentModel = require("../models/studentModel");
const mongoose = require("mongoose");

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

    // Ensure `degree` is either a valid ObjectId or `null`
    const degreeValue = degree && mongoose.Types.ObjectId.isValid(degree) ? degree : null;

    // Find if the user has an existing education document
    let existingEducation = await addEducationModel.findOne({ user: userId });

    // If no education document exists, create one
    if (!existingEducation) {
      const newEducation = new addEducationModel({
        user: userId,
        college: [
          {
            collegeName: university,
            fieldOfStudy: studyfield,
            degree, 
            grade,
            startYear: startyear,
            endYear: endyear,
          },
        ],
      });

      // Save the new education document
      await newEducation.save();

      // Add education ID to the student model
      // const updateStudent = await studentModel.findByIdAndUpdate(userId, {
      //   education: newEducation._id,
      // });

      // if (!updateStudent) {
      //   return res.status(httpsStatusCode.BAD_REQUEST).json({
      //     success: false,
      //     message: "College education not added to the student model",
      //   });
      // }

      // const updateMentor = await mentorModel.findByIdAndUpdate(userId, {
      //   education: newEducation._id,
      // });
      // if (!updateMentor) {
      //   return res.status(httpsStatusCode.BAD_REQUEST).json({
      //     success: false,
      //     message: "College education not added to the mentor model",
      //   });
      // }



      return res.status(httpsStatusCode.CREATED).json({
        success: true,
        message: "College education added successfully",
        data: newEducation,
      });
    }

    // If education document exists, push new college entry into the college array
    existingEducation.college.push({
      collegeName: university,
      fieldOfStudy: studyfield,
      degree,  
      grade,
      startYear: startyear,
      endYear: endyear,
    });

    // Save the updated education document
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

    const existingEducation = await addEducationModel.findOne({ user: userId });

    let addNewSchoolEducation;
    if (!existingEducation) {
      // If no education exists for the user, create a new entry with the school details
      addNewSchoolEducation = await addEducationModel.create({
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
    } else {
      // If education exists, update the school array
      addNewSchoolEducation = await addEducationModel.findByIdAndUpdate(
        existingEducation._id,
        {
          $push: {
            school: {
              schoolName: schoolname,
              classof,
              yearOfPassing: passoutyear,
              grade: finalgrade,
            },
          },
        },
        { new: true } // Return the updated document
      );
    }

    if (!addNewSchoolEducation) {
      return res.status(httpsStatusCode.BAD_REQUEST).json({
        success: false,
        message: "School Education not added",
      });
    }

    return res.status(httpsStatusCode.CREATED).json({
      success: true,
      message: "School Education added successfully",
      data: addNewSchoolEducation,
    });
  } catch (error) {
    return res.status(httpsStatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

// Get college education details
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

    if (!existingEducation) {
      return res.status(httpsStatusCode.BAD_REQUEST).json({
        success: false,
        message: "College Education not found",
      });
    }

    return res.status(httpsStatusCode.OK).json({
      success: true,
      message: "College Education found successfully",
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

// Get school education details
const getSchoolEducation = async (req, res) => {
  try {
    const userId = req.user.user._id;

    if (!userId) {
      return res.status(httpsStatusCode.UNAUTHORIZED).json({
        success: false,
        message: "User must be logged in",
      });
    }

    const existingEducation = await addEducationModel.findOne({ user: userId });

    if (!existingEducation) {
      return res.status(httpsStatusCode.BAD_REQUEST).json({
        success: false,
        message: "School Education not found",
      });
    }

    return res.status(httpsStatusCode.OK).json({
      success: true,
      message: "School Education found successfully",
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

// Get education list for a user
const getEducationList = async (req, res) => {
  try {
    const userId = req.user.user.userId;

    if (!userId) {
      return res.status(httpsStatusCode.UNAUTHORIZED).json({
        success: false,
        message: "User must be logged in",
      });
    }

    const existingEducation = await addEducationModel.findOne({ user: userId }).populate("college.degree");

    if (!existingEducation) {
      return res.status(httpsStatusCode.BAD_REQUEST).json({
        success: false,
        message: "Education not found",
      });
    }

    return res.status(httpsStatusCode.OK).json({
      success: true,
      message: "Education found successfully",
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

const deleteEducation = async (req, res) => {
  try {
    const userId = req.user.user.userId;

    if (!userId) {
      return res.status(httpsStatusCode.UNAUTHORIZED).json({
        success: false,
        message: "User must be logged in",
      });
    }

    const existingEducation = await addEducationModel.findOne({ user: userId });

    if (!existingEducation) {
      return res.status(httpsStatusCode.BAD_REQUEST).json({
        success: false,
        message: "Education not found",
      });
    }

    // Delete the education document
    await existingEducation.delete();

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
}

module.exports = { addCollegeEducation, addSchoolEducation, getCollegeEducation, getSchoolEducation, getEducationList, deleteEducation };
