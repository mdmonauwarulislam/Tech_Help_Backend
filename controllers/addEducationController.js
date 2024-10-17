const httpsStatusCode = require("../constant/httpsStatusCode");
const addEducationModel = require("../models/addEducationModel");
const studentModel = require("../models/studentModel");

const addCollegeEducation = async (req, res) => {
  try {
    const {university,studyfield,degree,grade,startyear,endyear} = req.body;
    const userId = req.user.user.userId;
    if (!userId) {
      return res.status(httpsStatusCode.UNAUTHORIZED).json({
        success: false,
        message: " User must be logged in",
      });
    }
    const existingEducation = await addEducationModel.findOne({user:userId});
    let addNewCollegeEducation;
    if (!existingEducation) {
      addNewCollegeEducation = await addEducationModel.create({
        user: userId,
        college: [
          {
            collegeName: university,
            fieldOfStudy: studyfield,
            degree: degree,
            grade,
            startYear: startyear,
            endYear: endyear,
          },
        ],
      });

      //adding the eduction objectid to the student model
      const addEducationIdInUser=await studentModel.findByIdAndUpdate(userId,{
        education: addNewCollegeEducation._id,
      });
      if (!addEducationIdInUser) {
        return res.status(httpsStatusCode.BAD_REQUEST).json({
          success: false,
          message: "College Education not added",
        });
      }
    } else {
      addNewCollegeEducation = await addEducationModel.findByIdAndUpdate(
        existingEducation._id,
        {
          college: [
            ...existingEducation.college,
            {
                collegeName: university,
                fieldOfStudy: studyfield,
                degree: degree,
                grade,
                startYear: startyear,
                endYear: endyear,
              },
          ],
        }
      );
    }

    if (!addNewCollegeEducation) {
      return res.status(httpsStatusCode.BAD_REQUEST).json({
        success: false,
        message: "College Education not added",
      });
    }
    return res.status(httpsStatusCode.CREATED).json({
      success: true,
      message: "College Education added successfully",
      data: addNewCollegeEducation,
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
            message: " User must be logged in",
        });
        }
        const existingEducation = await addEducationModel.findById({ user: userId });
        let addNewSchoolEducation;
        if (!existingEducation) {
        addNewSchoolEducation = await addEducationModel.create({
            user: userId,
            school: [
            {
                schoolName : schoolname,
                classof ,
                yearOfPassing : passoutyear,
                grade : finalgrade
            },
            ],
        });
        } else {
        addNewSchoolEducation = await addEducationModel.findByIdAndUpdate(
            existingEducation._id,
            {
            school: [
                ...existingEducation.school,
                {
                    schoolName : schoolname,
                    classof ,
                    yearOfPassing : passoutyear,
                    grade : finalgrade
                },
            ],
            }
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
    }

    const getCollegeEducation = async (req, res) => {
        try {
            const userId = req.user.user.userId;
            if (!userId) {
                return res.status(httpsStatusCode.UNAUTHORIZED).json({
                    success: false,
                    message: " User must be logged in",
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

    const getSchoolEducation = async (req, res) => {
        try {
            const userId = req.user.user._id;
            if (!userId) {
                return res.status(httpsStatusCode.UNAUTHORIZED).json({
                    success: false,
                    message: " User must be logged in",
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

    // get education list of  a user 
    const getEducationList = async (req, res) => {
      try {
        const userId = req.user.user.userId;
        if (!userId) {
          return res.status(httpsStatusCode.UNAUTHORIZED).json({
            success: false,
            message: " User must be logged in",
          });
        }
        const existingEducation = await addEducationModel.findOne({user : userId}).populate("college.degree");
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
    }

module.exports = { addCollegeEducation, addSchoolEducation, getCollegeEducation, getSchoolEducation, getEducationList };
